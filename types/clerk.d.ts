// Session token must expose publicMetadata.role (Clerk Dashboard →
// Sessions → customize token → { "metadata": "{{user.public_metadata}}" }).
// Admin = sessionClaims?.metadata?.role === 'admin'.
declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: string;
    };
  }
}

export {};
