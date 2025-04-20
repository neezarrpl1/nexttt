import type { SyntheticEvent } from 'react';
import type { Blog } from './types/contents';
import { GITHUB_TOKEN } from './env';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { GithubUser } from './types/github';


type PreventBubblingProps = {
  preventDefault?: boolean;
  callback?: (...args: never[]) => unknown;
};

/**
 * Prevents the event from bubbling up the DOM tree.
 */
export function preventBubbling({
  preventDefault,
  callback
}: PreventBubblingProps = {}) {
  return (e: SyntheticEvent): void => {
    e.stopPropagation();

    if (preventDefault) e.preventDefault();
    if (callback) callback();
  };
}

export async function getGithubUsername(userId: string): Promise<string> {
  const response = await fetch(`https://api.github.com/user/${userId}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });

  const { login } = (await response.json()) as GithubUser;
  return login;
}

export function getTotalLikes(likes: Record<string, number>): number {
  return Object.values(likes).reduce((accLikes, like) => accLikes + like, 0);
}

export function getBearerToken(req: NextRequest): string | null {
  const authorization = req.headers.get('authorization');
  if (!authorization) return null;

  const [authType, bearerToken] = authorization.split(' ');
  if (authType.toLowerCase() !== 'bearer' || !bearerToken) return null;

  return bearerToken;
}

export function getOrigin(req: NextRequest): string | null {
  const origin = req.headers.get('origin');
  if (origin) return origin;

  const referer = req.headers.get('referer');
  if (!referer) return null;

  return new URL(referer).origin;
}

export const VALID_CONTENT_TYPES = ['blog', 'projects'] as const;
type ValidContentTypes = (typeof VALID_CONTENT_TYPES)[number];

export function isValidContentType(type: string): type is ValidContentTypes {
  return VALID_CONTENT_TYPES.includes(type as ValidContentTypes);
}

export function generateNextResponse(status: number, message: string): NextResponse {
  return new NextResponse(JSON.stringify({ message }), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}
/**
 * Returns the content without the extension.
 */
export function removeContentExtension(content: string): string {
  return content.replace(/\.mdx$/, '');
}

/**
 * Returns an array of unique tags from the contents.
 */
export function getTags(contents: Blog[]): string[] {
  const validTags = contents.flatMap(({ tags }) =>
    tags.split(',').map((tag) => tag.trim())
  );

  const uniqueTags = Array.from(new Set(validTags));

  return uniqueTags;
}

/**
 * Returns a boolean value indicating whether the target text includes the filter text.
 */
export function textIncludes(target: string, filter: string): boolean {
  const [newTarget, newFilter] = [target, filter].map((text) =>
    text.replace(/\W/g, '').toLowerCase()
  );
  return newTarget.includes(newFilter);
}

