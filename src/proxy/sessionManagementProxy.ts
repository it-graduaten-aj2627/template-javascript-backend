import type {NextRequest, NextResponse} from 'next/server'
import {SessionDuration} from '@/constants'
import {getLogger} from '@/lib/logger'
import {extendSessionAndSetCookie} from '@/lib/sessionUtils'
import type {SessionWithProfile} from '@/models/users'

export async function sessionManagementProxy(
  _: NextRequest,
  response: NextResponse,
  session: SessionWithProfile | null,
): Promise<NextResponse> {
  if (!session || session.activeUntil.getTime() < Date.now()) return response
  const logger = await getLogger()

  if (session.activeUntil.getTime() - Date.now() < SessionDuration[session.user.role] / 2) {
    await extendSessionAndSetCookie(session.id, session.user.role)
    logger.info(`Extended session ${session.id} by ${SessionDuration[session.user.role]} ms`)
  }

  return response
}
