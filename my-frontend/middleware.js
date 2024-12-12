// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  console.log('Middleware executed:', req.nextUrl.pathname); 
  console.log('Request headers:', req.headers); 

  // Your authentication logic here (e.g., token check)
  return NextResponse.next(); 
}

export const config = {
  matcher: ['/((?!api|static|.*\.(?:png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot|ico)).*$)'],
};