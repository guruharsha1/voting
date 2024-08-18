import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Cache } from './app/utils/cache'
import { v4 as uuidv4 } from 'uuid';
export function middleware(request: NextRequest) {
  
  if(request.cookies.has('udaal')){
    return NextResponse.next()
  }
  const expires = new Date()
  expires.setHours(23, 59, 0, 0)
  const response = NextResponse.next()
  response.cookies.set({
    name: 'udaal',
    value: uuidv4(),
    expires
  });
  Cache.getInstance().add('udaal',expires);
  return response;
}