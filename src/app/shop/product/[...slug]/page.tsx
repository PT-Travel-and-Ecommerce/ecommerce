import { relatedProductData } from "@/app/page";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

function transformProduct(dbProduct: any): Product {
  return {
    id: parseInt(dbProduct.id) || 0,
    title: dbProduct.name,
    srcUrl: dbProduct.image || dbProduct.images?.[0] || "",
    gallery: dbProduct.images?.length > 0 ? dbProduct.images : [dbProduct.image],
    price: Number(dbProduct.price),
    discount: {
      amount: 0,
      percentage: Number(dbProduct.discount) || 0,
    },
    rating: Number(dbProduct.rating) || 0,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const productIdParam = params.slug[0];
  let productData: Product | null = null;

  try {
    // First, try to find by the ID string directly (for cuid)
    let dbProduct = await prisma.product.findUnique({
      where: { id: productIdParam },
    });

    // If not found and it's a number, get the first product as fallback
    if (!dbProduct && !isNaN(Number(productIdParam))) {
      const allProducts = await prisma.product.findMany({
        orderBy: { createdAt: 'asc' },
        take: 1,
      });
      dbProduct = allProducts[0] || null;
    }

    if (dbProduct) {
      productData = transformProduct(dbProduct);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  // Fallback to static data if not found in database
  if (!productData) {
    const numericId = Number(productIdParam);
    if (!isNaN(numericId)) {
      productData = relatedProductData.find(
        (product) => product.id === numericId
      ) || relatedProductData[0] || null;
    }
  }

  if (!productData?.title) {
    notFound();
  }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div>
    </main>
  );
}
