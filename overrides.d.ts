/* First Override: .svg
 * Default Next.js: svg is any type (declared in next/image-types/wrapper.d.ts)
 * Apply specific 'Reactive' type to such svg files.
 */
import { SVGItem } from './global';

declare module '*.svg' {
    const svg: SVGItem;
    export default svg;
}
