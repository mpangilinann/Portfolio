import assets from "../data/imageAssets.json";

// Catalog paths remain the original sources; this manifest supplies delivery variants.
export default function OptimizedImage({ src, sizes = "100vw", loading = "lazy", as: element = "img", ...props }) {
  const Component = element;
  const asset = assets[src];
  return <Component src={asset?.src ?? src} srcSet={asset?.srcSet} sizes={asset ? sizes : undefined}
    width={asset?.width} height={asset?.height} loading={loading} decoding="async" {...props} />;
}
