import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { getItemById } from "@/lib/prismaQueries";
import { authOptions } from "@/lib/authOptions";
import { Container } from "@/lib/Container";

interface Props {
    params: Promise<{ id: string }>;
}
export default async function ItemDetailPage({ params }: Props) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/auth/signin");
    }
    const { id } = await params;
    const itemId = parseInt(id, 10);
    if (isNaN(itemId)) {
        return notFound();
    }

    const item = await getItemById(session.user.id, itemId);
    if (!item) {
        return notFound();
    }

    return (
        <Container>
            {
                item &&
                <>
                    {
                        item.images.length > 0 &&
                        item.images.map((image, index) => {
                            return <Image src={image.url} alt={`${item.name}-product-image-${index}`} width="80" height="100" />
                        })
                    }
                    <strong>Name:</strong>&nbsp;{item.name}
                    <strong>Latest Price:</strong>&nbsp;{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.prices[0].price)}
                    <strong>UPC:</strong>&nbsp;{item.upc}
                    <strong>Store:</strong>&nbsp;{item.location?.name ?? "--"}
                    <strong>Price History:</strong>
                    {
                        item.prices.map((price) => {
                            return <p>{new Date(price.date).toISOString().split("T")[0]}: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price.price)}</p>
                        })
                    }
                </>
            }

        </Container>
    );
}