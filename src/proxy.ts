import {corsProxy} from '@/proxy/corsProxy'
import {loggingProxy} from '@/proxy/loggingProxy'
import {redirectProxy} from '@/proxy/redirectProxy'
import {sessionManagementProxy} from '@/proxy/sessionManagementProxy'
import {withProxy} from '@/proxy/withProxy'

// De proxy functie wordt uitgevoerd voor elk request.
// We gebruiken deze functie hier om een uniek requestId toe te voegen aan elk request, zo kan de gebruiker het id
// meegeven aan support als er iets mis gaat.

export const proxy = withProxy(loggingProxy, redirectProxy, sessionManagementProxy, corsProxy)
