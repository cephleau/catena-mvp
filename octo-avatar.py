#!/usr/bin/env python3
"""
Octo — Desktop Companion (Clippy-style)
- Centered on screen
- Multiple animations: idle pulse, bob, blink, excited bounce
- Speech bubbles with tips
- Click to cycle animations / show bubble
- Drag to reposition
- Double-click to quit
"""

import tkinter as tk
from tkinter import font as tkfont
from PIL import Image, ImageTk, ImageEnhance, ImageFilter
import os, random, math

GIF_PATH    = os.path.join(os.path.dirname(__file__), "avatars/octo-animated.gif")
AVATAR_SIZE = 220
NAVY        = "#08234B"
ORANGE      = "#FF6B00"
WHITE       = "#FFFFFF"
BUBBLE_BG   = "#EFF6FF"
BUBBLE_FG   = "#0F1F3D"

QUIPS = [
    "👋 Hey Carlos. Ready to move tasks to Done?",
    "🐙 Eight arms. All yours.",
    "💡 Have you posted on LinkedIn today?",
    "📋 Kanban's light on In Progress. Let's fix that.",
    "⚡ LLCs don't file themselves. Just saying.",
    "🎯 30-day sprint. Clock's ticking.",
    "💰 First revenue by April 21. We got this.",
    "🏛️ BidNet registration for Catena — want to knock it out?",
    "📣 LinkedIn Post 1 is ready to go. Copy. Paste. Post.",
    "🤝 LanguageLine subcontract app = ~20 min. Worth it.",
    "🔍 Want me to research something?",
    "📞 Discovery calls don't book themselves.",
    "🐙 It looks like you're launching a business. Want help?",
]

class SpeechBubble(tk.Toplevel):
    def __init__(self, parent, text, ax, ay, on_close):
        super().__init__(parent)
        self.on_close = on_close
        self.overrideredirect(True)
        self.attributes("-topmost", True)
        self.configure(bg="#c5d5e8")

        inner = tk.Frame(self, bg=BUBBLE_BG, padx=14, pady=10)
        inner.pack(padx=1, pady=1, fill="both", expand=True)

        f = tkfont.Font(family="Helvetica Neue", size=12)
        tk.Label(inner, text=text, wraplength=260, bg=BUBBLE_BG, fg=BUBBLE_FG,
                 font=f, justify="left", anchor="w").pack(anchor="w")

        btns = tk.Frame(inner, bg=BUBBLE_BG)
        btns.pack(fill="x", pady=(8,0))

        tk.Button(btns, text="✕ Dismiss", bg=BUBBLE_BG, fg="#94a3b8",
                  relief="flat", font=tkfont.Font(size=11),
                  cursor="hand2", command=self.dismiss).pack(side="right")

        self.update_idletasks()
        bw = self.winfo_reqwidth()
        bh = self.winfo_reqheight()
        bx = ax + AVATAR_SIZE // 2 - bw // 2
        by = ay - bh - 12
        # keep on screen
        bx = max(10, bx)
        by = max(10, by)
        self.geometry(f"+{bx}+{by}")

    def dismiss(self):
        self.on_close()
        self.destroy()


class OctoAvatar:
    def __init__(self, root):
        self.root = root
        self.root.title("Octo")
        self.root.overrideredirect(True)
        self.root.attributes("-topmost", True)
        self.root.attributes("-alpha", 0.96)
        self.root.configure(bg=NAVY)

        # Center on screen
        sw = root.winfo_screenwidth()
        sh = root.winfo_screenheight()
        self.base_x = (sw - AVATAR_SIZE) // 2
        self.base_y = (sh - AVATAR_SIZE) // 2
        self.root.geometry(f"{AVATAR_SIZE}x{AVATAR_SIZE}+{self.base_x}+{self.base_y}")

        # Load GIF frames
        self.gif_frames = []
        self.gif_durations = []
        gif = Image.open(GIF_PATH)
        try:
            while True:
                f = gif.copy().convert("RGBA").resize((AVATAR_SIZE, AVATAR_SIZE), Image.LANCZOS)
                self.gif_frames.append(f)
                self.gif_durations.append(gif.info.get("duration", 60))
                gif.seek(gif.tell() + 1)
        except EOFError:
            pass

        self.tk_frames = [ImageTk.PhotoImage(f) for f in self.gif_frames]

        self.label = tk.Label(root, bg=NAVY, bd=0, highlightthickness=0, cursor="hand2")
        self.label.pack(fill="both", expand=True)

        # Animation state
        self.gif_idx    = 0
        self.anim_mode  = "idle"   # idle | bob | bounce | wave
        self.bob_tick   = 0
        self.bounce_tick = 0
        self.wave_tick  = 0
        self.anim_offset_y = 0

        self.bubble      = None
        self.bubble_open = False

        # Drag
        self._drag_x = 0
        self._drag_y = 0
        self._dragging = False

        # Bindings
        self.label.bind("<ButtonPress-1>",   self.start_drag)
        self.label.bind("<B1-Motion>",       self.on_drag)
        self.label.bind("<ButtonRelease-1>", self.end_drag)
        self.label.bind("<Double-Button-1>", lambda e: self.root.destroy())

        self.menu = tk.Menu(root, tearoff=0, bg=NAVY, fg=WHITE,
                            activebackground=ORANGE, activeforeground=WHITE)
        self.menu.add_command(label="Bob",    command=lambda: self.set_mode("bob"))
        self.menu.add_command(label="Bounce", command=lambda: self.set_mode("bounce"))
        self.menu.add_command(label="Wave",   command=lambda: self.set_mode("wave"))
        self.menu.add_command(label="Idle",   command=lambda: self.set_mode("idle"))
        self.menu.add_separator()
        self.menu.add_command(label="Show tip", command=self.show_bubble)
        self.menu.add_separator()
        self.menu.add_command(label="Quit", command=root.destroy)
        self.label.bind("<Button-2>", self.show_menu)
        self.label.bind("<Button-3>", self.show_menu)

        # Start
        self.tick()
        self.root.after(2000, self.show_bubble)
        self.root.after(300000, self.auto_quip)

        # Cycle animations automatically
        self.root.after(8000, self.auto_mode)

    # ── Animation loop ────────────────────────────────────────────────────────

    def tick(self):
        # Advance GIF frame
        img = self.gif_frames[self.gif_idx].copy()
        dur = self.gif_durations[self.gif_idx]
        self.gif_idx = (self.gif_idx + 1) % len(self.gif_frames)

        # Compute positional offset for current mode
        off_y = 0
        off_x = 0

        if self.anim_mode == "bob":
            self.bob_tick += 1
            off_y = int(math.sin(self.bob_tick * 0.18) * 9)

        elif self.anim_mode == "bounce":
            self.bounce_tick += 1
            t = self.bounce_tick * 0.3
            # Bouncy abs-sine
            off_y = -int(abs(math.sin(t)) * 22)
            if self.bounce_tick > 60:
                self.anim_mode = "bob"

        elif self.anim_mode == "wave":
            self.wave_tick += 1
            off_x = int(math.sin(self.wave_tick * 0.25) * 12)
            off_y = int(math.cos(self.wave_tick * 0.12) * 6)
            if self.wave_tick > 80:
                self.anim_mode = "idle"

        # Apply brightness pulse (already baked into gif) + optional scale bounce
        tk_img = ImageTk.PhotoImage(img)
        self.tk_frames[self.gif_idx] = tk_img  # keep ref
        self.label.configure(image=tk_img)

        # Move window for positional animations
        nx = self.base_x + off_x
        ny = self.base_y + off_y
        self.root.geometry(f"{AVATAR_SIZE}x{AVATAR_SIZE}+{nx}+{ny}")

        self.root.after(dur, self.tick)

    def set_mode(self, mode):
        self.anim_mode   = mode
        self.bob_tick    = 0
        self.bounce_tick = 0
        self.wave_tick   = 0

    def auto_mode(self):
        """Randomly pick a fun animation every 8s"""
        if self.anim_mode == "idle":
            choice = random.choice(["bob", "wave", "idle", "idle"])
            self.set_mode(choice)
        self.root.after(8000, self.auto_mode)

    # ── Speech bubble ─────────────────────────────────────────────────────────

    def show_bubble(self):
        if self.bubble_open:
            return
        self.set_mode("bounce")  # excited!
        text = random.choice(QUIPS)
        ax = self.root.winfo_x()
        ay = self.root.winfo_y()
        self.bubble_open = True
        self.bubble = SpeechBubble(
            self.root, text, ax, ay,
            on_close=lambda: setattr(self, "bubble_open", False)
        )

    def auto_quip(self):
        self.show_bubble()
        self.root.after(300000, self.auto_quip)

    # ── Drag ──────────────────────────────────────────────────────────────────

    def start_drag(self, event):
        self._drag_x  = event.x
        self._drag_y  = event.y
        self._dragging = False

    def on_drag(self, event):
        self._dragging = True
        if self.bubble:
            try: self.bubble.destroy()
            except: pass
            self.bubble_open = False
        self.base_x = self.root.winfo_x() + event.x - self._drag_x
        self.base_y = self.root.winfo_y() + event.y - self._drag_y
        self.root.geometry(f"+{self.base_x}+{self.base_y}")

    def end_drag(self, event):
        if not self._dragging:
            self.show_bubble()

    def show_menu(self, event):
        self.menu.tk_popup(event.x_root, event.y_root)


if __name__ == "__main__":
    root = tk.Tk()
    OctoAvatar(root)
    root.mainloop()
