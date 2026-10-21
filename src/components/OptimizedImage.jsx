import assets from "../data/imageAssets.json";

// Catalog paths remain the original sources; this manifest supplies delivery variants.
export default function OptimizedImage({ src, sizes = "100vw", loading = "lazy", ...props }) {
  const asset = assets[src];
  return <img src={asset?.src ?? src} srcSet={asset?.srcSet} sizes={asset ? sizes : undefined}
    width={asset?.width} height={asset?.height} loading={loading} decoding="async" {...props} />;
}
