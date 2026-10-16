// // src/lib/session.ts
// import { InMemoryCache, NormalizedCacheObject } from "@apollo/client";

// /**
//  * Holds the Apollo cache for each active session.
//  * A session expires after 10 minutes of inactivity.
//  */
// type Session = {
//   cache: InMemoryCache;
//   timeoutId: NodeJS.Timeout;
// };

// const SESSION_TTL = 10 * 60 * 1000; // 10 minutes

// const sessions = new Map<string, Session>();

// /**
//  * Returns a cache for the given session id, creating a new one if needed.
//  * Resets the expiration timer on each call.
//  */
// export function getCacheForSession(sessionId: string): InMemoryCache {
//   let entry = sessions.get(sessionId);

//   if (!entry) {
//     entry = {
//       cache: new InMemoryCache(),
//       timeoutId: setTimeout(() => expireSession(sessionId), SESSION_TTL),
//     };
//     sessions.set(sessionId, entry);
//   } else {
//     // refresh expiration
//     clearTimeout(entry.timeoutId);
//     entry.timeoutId = setTimeout(() => expireSession(sessionId), SESSION_TTL);
//   }

//   return entry.cache;
// }

// /**
//  * Force‑expire a session – called by the timeout handler.
//  */
// function expireSession(sessionId: string) {
//   const entry = sessions.get(sessionId);
//   if (entry) {
//     entry.cache.reset(); // clear Apollo cache
//     sessions.delete(sessionId);
//   }
// }

// /**
//  * Utility to generate a simple client‑side session identifier.
//  * In a real app you’d probably use a secure UUID stored in a http‑only cookie.
//  */
// export function createSessionId(): string {
//   return crypto.randomUUID();
// }


'use server'
// import 'server-only' 
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { LoginUser, PasswordChange } from '@/lib/graphql/mutations/auth_mutation'

// const secretKey = process.env.SESSION_SECRET
// const encodedKey = new TextEncoder().encode(secretKey)

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)


export async function createSession(username: string, password: string): Promise<{ success: boolean, errors: object }> {
  //   const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  const expiresAt = new Date(Date.now() + 1 / 2 * 24 * 60 * 60 * 1000)
  const data = await LoginUser(
    {
      username: username,
      password: password,
    })
  if (data.success && data.token) {
    const token = data.token
    // const session = await encrypt({ token, expiresAt })
    const cookieStore = await cookies()

    cookieStore.set('session', token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
    return { success: data.success, errors: [] }
  }
  else {
    return { success: false, errors: data.errors }
  }
}

export async function createPasswordChangeSession(oldpassword: string, password1: string, password2: string): Promise<{ success: boolean, errors: object }> {
  //   const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  const expiresAt = new Date(Date.now() + 1 / 2 * 24 * 60 * 60 * 1000)
  const data = await PasswordChange(
    {
      oldPassword: oldpassword,
      newPassword1: password1,
      newPassword2: password2,
    })
  if (data.success && data.token) {
    const token = data.token
    // const session = await encrypt({ token, expiresAt })
    const cookieStore = await cookies()

    cookieStore.set('session', token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
    return { success: data.success, errors: [] }
  }
  else {
    return { success: false, errors: data.errors }
  }
}


export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session', error)
  }
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  //   const payload = await decrypt(session)

  if (!session) {
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}


export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  //   const payload = await decrypt(session)
  if (!session)
    return null
  return session
}

// add alongside createSession / deleteSession

export async function setServerSession(token: string): Promise<{ success: boolean }> {
  const expiresAt = new Date(Date.now() + (1 / 2) * 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })

  return { success: true }
}

