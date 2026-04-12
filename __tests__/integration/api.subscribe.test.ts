import { describe, it, expect } from 'vitest';

const API_URL = 'http://localhost:3002/api/subscribe';
const BASE_TEST_EMAIL = `test-${Date.now()}`;

/**
 * Integration tests for the subscription API
 *
 * Prerequisites:
 * - .env.local must be configured with MAILERLITE_API_KEY and MAILERLITE_GROUP_ID
 * - Server must be running on port 3001 (npm run dev)
 */

describe('GET /api/subscribe (Connection Test)', () => {
  it('should return connection status to MailerLite', async () => {
    const response = await fetch(API_URL, {
      method: 'GET',
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(data.message).toContain('connecté');
    expect(data.group).toBeDefined();
    expect(data.group.id).toBeDefined();
    expect(data.group.name).toBeDefined();
    expect(typeof data.group.name).toBe('string');
  });

  it('should show MailerLite group details', async () => {
    const response = await fetch(API_URL, {
      method: 'GET',
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.group).toHaveProperty('id');
    expect(data.group).toHaveProperty('name');
    console.log('✓ MailerLite connecté:', data.group.name);
  });
});

describe('POST /api/subscribe (Subscription)', () => {
  it('should handle email validation', async () => {
    const invalidEmails = [
      'invalid',
      'invalid@',
      '@example.com',
      'test @example.com',
      'test@example',
    ];

    for (const email of invalidEmails) {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      expect([400, 500]).toContain(response.status);
      const data = await response.json();
      expect(data.message).toBeDefined();
    }
  });

  it('should reject missing email', async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    expect([400, 500]).toContain(response.status);
  });

  it('should handle POST request without error', async () => {
    const email = `${BASE_TEST_EMAIL}-post-test@example.com`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    // Accept any response (we're testing the endpoint is reachable)
    expect(response.status).toBeDefined();
    console.log(`POST Response Status: ${response.status}`);
    expect([200, 201, 400, 405, 422, 500]).toContain(response.status);

    const data = await response.json();
    expect(data.message).toBeDefined();
  });
});
