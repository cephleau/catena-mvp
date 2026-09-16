#!/usr/bin/env node

/**
 * Setup Supabase Schema for Service Requests
 * Run with: node scripts/setup-supabase.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

async function runMigration() {
  try {
    console.log('🔄 Reading migration file...');
    const migrationPath = path.join(__dirname, '../supabase/migrations/create_service_requests_table.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    console.log('📡 Connecting to Supabase...');
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        sql: sql,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Supabase Error:', error);
      process.exit(1);
    }

    console.log('✅ Migration complete!');
    console.log('');
    console.log('📊 Tables created:');
    console.log('   - service_requests (with RLS, indexes, and triggers)');
    console.log('');
    console.log('🚀 Next steps:');
    console.log('   1. Deploy: git push');
    console.log('   2. Test form: https://catenalanguagepartners.com/providers');
    console.log('');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

runMigration();
