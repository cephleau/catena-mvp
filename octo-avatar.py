#!/usr/bin/env python3
"""
Octo — Desktop Companion (Clippy-style)
- Animated avatar, always on top
- Speech bubbles with tips/quips
- Click to open chat
- Drag to reposition
- Double-click to dismiss bubble
"""

import tkinter as tk
from tkinter import font as tkfont
from PIL import Image, ImageTk
import os
import random
import subprocess
import threading
import time

GIF_PATH  = os.path.join(os.path.dirname(__file__), "avatars/octo-animated.gif")
AVATAR_SIZE = 180
BUBBLE_W    = 280
NAVY        = "#08234B"
ORANGE      = "#FF6B00"
WHITE       = "#FFFFFF"
BUBBLE_BG   = "#EFF6FF"
BUBBLE_FG   = "#0F1F3D"

QUIPS = [
    "👋 Hey Carlos. Ready to move some tasks to Done?",
    "🐙 Eight arms, all yours.",
    "💡 Have you posted on LinkedIn today?",
    "📋 Kanban's looking light on In Progress. Let's fix that.",
    "⚡ LLCs don't file themselves. Just saying.",
    "🎯 30-day sprint. Clock's ticking.",
    "🔍 Want me to research something?",
    "📞 Discovery calls don't book themselves either.",
    "💰 First revenue by April 21. We got this.",
    "🏛️ BidNet registration for Catena — want to knock that out?",
    "📣 LinkedIn Post 1 is ready to copy-paste. Go get some impressions.",
    "🤝 LanguageLine subcontract app takes ~20 min. Worth it.",
]

class SpeechBubble(tk.Toplevel):
    def __init__(self, parent, text, x, y, on_close):
        super().__init__(parent)
        self.on_close = on_close
        self.overrideredirect(True)
        self.attributes("-topmost", True)
        self.configure(bg=BUBBLE_BG)

        # Drop shadow feel via padding
        outer = tk.Frame(self, bg="#c5d5e8", padx=1, pady=1)
        outer.pack(fill="both", expand=True)

        inner = tk.Frame(outer, bg=BUBBLE_BG, padx=12, pady=10)
        inner.pack(fill="both", expand=True)

        msg_font = tkfont.Font(family="Helvetica Neue", size=12)
        lbl = tk.Label(inner, text=text, wraplength=BUBBLE_W - 40,
                       bg=BUBBLE_BG, fg=BUBBLE_FG, font=msg_font,
                       justify="left", anchor="w")
        lbl.pack(anchor="w")

        btn_frame = tk.Frame(inner, bg=BUBBLE_BG)
        btn_frame.pack(fill="x", pady=(8, 0))

        chat_btn = tk.Button(btn_frame, text="Open Chat →",
                             bg=ORANGE, fg=WHITE, relief="flat",
                             font=tkfont.Font(family="Helvetica Neue", size=11, weight="bold"),
                             padx=10, pady=4, cursor="hand2",
                             command=self.open_chat)
        chat_btn.pack(side="left")

        close_btn = tk.Button(btn_frame, text="✕",
                              bg=BUBBLE_BG, fg="#94a3b8", relief="flat",
                              font=tkfont.Font(size=12), cursor="hand2",
                              command=self.dismiss)
        close_btn.pack(side="right")

        self.update_idletasks()
        bw = self.winfo_reqwidth()
        bh = self.winfo_reqheight()

        # Position above-left of avatar
        bx = max(0, x - bw - 10)
        by = max(0, y - bh - 10)
        self.geometry(f"+{bx}+{by}")

    def open_chat(self):
        self.dismiss()
        subprocess.Popen(["open", "https://localhost:3000"])  # adjust to your webchat URL

    def dismiss(self):
        self.on_close()
        self.destroy()


class OctoAvatar:
    def __init__(self, root):
        self.root = root
        self.root.title("Octo")
        self.root.overrideredirect(True)
        self.root.attributes("-topmost", True)
        self.root.attributes("-alpha", 0.95)
        self.root.configure(bg=NAVY)

        # Start bottom-right
        sw = root.winfo_screenwidth()
        sh = root.winfo_screenheight()
        self.x = sw - AVATAR_SIZE - 24
        self.y = sh - AVATAR_SIZE - 60
        self.root.geometry(f"{AVATAR_SIZE}x{AVATAR_SIZE}+{self.x}+{self.y}")

        # Load GIF frames
        self.frames = []
        self.durations = []
        gif = Image.open(GIF_PATH)
        try:
            while True:
                frame = gif.copy().convert("RGBA").resize(
                    (AVATAR_SIZE, AVATAR_SIZE), Image.LANCZOS)
                self.frames.append(ImageTk.PhotoImage(frame))
                self.durations.append(gif.info.get("duration", 60))
                gif.seek(gif.tell() + 1)
        except EOFError:
            pass

        self.label = tk.Label(root, bg=NAVY, bd=0, highlightthickness=0, cursor="hand2")
        self.label.pack(fill="both", expand=True)

        self.current_frame = 0
        self.animate()

        # State
        self._drag_x = 0
        self._drag_y = 0
        self._dragging = False
        self.bubble = None
        self.bubble_open = False

        # Bindings
        self.label.bind("<ButtonPress-1>", self.start_drag)
        self.label.bind("<B1-Motion>", self.on_drag)
        self.label.bind("<ButtonRelease-1>", self.end_drag)
        self.label.bind("<Double-Button-1>", lambda e: self.root.destroy())

        # Right-click
        self.menu = tk.Menu(root, tearoff=0, bg=NAVY, fg=WHITE,
                            activebackground=ORANGE, activeforeground=WHITE)
        self.menu.add_command(label="Show tip", command=self.show_bubble)
        self.menu.add_separator()
        self.menu.add_command(label="Quit Octo", command=root.destroy)
        self.label.bind("<Button-2>", self.show_menu)
        self.label.bind("<Button-3>", self.show_menu)

        # Auto-quip every 5 minutes
        self.schedule_quip()

        # First quip after 3 seconds
        self.root.after(3000, self.show_bubble)

    def animate(self):
        self.label.configure(image=self.frames[self.current_frame])
        dur = self.durations[self.current_frame]
        self.current_frame = (self.current_frame + 1) % len(self.frames)
        self.root.after(dur, self.animate)

    def start_drag(self, event):
        self._drag_x = event.x
        self._drag_y = event.y
        self._dragging = False

    def on_drag(self, event):
        self._dragging = True
        if self.bubble:
            try:
                self.bubble.destroy()
            except:
                pass
            self.bubble_open = False
        self.x = self.root.winfo_x() + event.x - self._drag_x
        self.y = self.root.winfo_y() + event.y - self._drag_y
        self.root.geometry(f"+{self.x}+{self.y}")

    def end_drag(self, event):
        if not self._dragging:
            self.show_bubble()

    def show_bubble(self):
        if self.bubble_open:
            return
        text = random.choice(QUIPS)
        ax = self.root.winfo_x()
        ay = self.root.winfo_y()
        self.bubble_open = True
        self.bubble = SpeechBubble(self.root, text, ax, ay,
                                   on_close=lambda: setattr(self, 'bubble_open', False))

    def schedule_quip(self):
        # Show a tip every 5 minutes (300000 ms)
        self.root.after(300000, self._auto_quip)

    def _auto_quip(self):
        self.show_bubble()
        self.schedule_quip()

    def show_menu(self, event):
        self.menu.tk_popup(event.x_root, event.y_root)


if __name__ == "__main__":
    root = tk.Tk()
    app = OctoAvatar(root)
    root.mainloop()
