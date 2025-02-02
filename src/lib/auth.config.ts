import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // List of protected routes
      const protectedPaths = [
        "/pages/settings",
        "/pages/user-management",
        "/pages/dashboard/zabbix",
        "/pages/dashboard/prtg",
        "/pages/report/zabbix",
        "/pages/report/prtg",
        "/pages/items-list/prtg",
        "/pages/items-list/zabbix",
        "/api/zabbix/get-host",
      ];

      // Check if the current route is protected
      const isOnProtectedPage = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isOnProtectedPage) {
        // If the user is logged in, allow access
        if (isLoggedIn) return true;

        // Redirect unauthenticated users to the login page
        return Response.redirect(new URL("/", nextUrl));
      }

      // For non-protected routes, redirect logged-in users to the default dashboard
      if (isLoggedIn) {
        return Response.redirect(new URL("/pages/dashboard/zabbix", nextUrl));
      }

      // Allow unauthenticated access for non-protected routes
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
