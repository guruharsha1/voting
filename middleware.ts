import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import rateLimit from 'next-rate-limit'
import { v4 as uuidv4 } from 'uuid';


const limiter = rateLimit({
  interval: 60 * 1000, 
  uniqueTokenPerInterval: Number(process.env.VALUES_PER_MINUTE) || 100 
});


function getIpAddress(req: NextRequest): string {
  const xForwardedFor = req.headers.get('x-forwarded-for');
  return xForwardedFor ? xForwardedFor.split(',')[0].trim() : 'unknown';
}

export function middleware(request: NextRequest) {
  const ipAddress = getIpAddress(request);


  const headers = limiter.checkNext(request, Number(ipAddress));
  const remaining = headers.get('X-RateLimit-Remaining');
  if (!remaining || remaining === '0') {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }


  if (request.cookies.has('udaal')) {
    return NextResponse.next();
  }

  const expires = new Date();
  expires.setHours(23, 59, 0, 0);
  const response = NextResponse.next();
  response.cookies.set({
    name: 'udaal',
    value: uuidv4(),
    expires
  });

  return response;
}
