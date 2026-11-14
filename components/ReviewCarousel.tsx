import { Star } from "lucide-react";

export type ReviewItem = {
    id: number;
    rating: number;
    comment: string | null;
    targetName: string;
};

type Propriedades = {
    title: string;
    avatar: string;
    userName: string;
    prefix:string;
    emptyText: string;
    items: ReviewItem[];
};

export default function ReviewsCarousel({ title, avatar, userName, prefix, emptyText, items}: Propriedades) {
    return (
        <section className="px-5 mt-10">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="ml-24 text-[#000000] text-3xl font-semibold">{title}</h2>
            </div>

            <div className="ml-24 mb-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.length === 0 && (
                    <p className="text-gray-600">{emptyText}</p>
                )}
            </div>

            {items.map((r) =>(
                <article
                    key={r.id}
                    className="flex min-h-[180px] w-[420px] shrink-0 snap-start flex-col rounded-3xl bg-white p6"
                >
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-4">
                            <img
                                src={avatar}
                                alt={userName}
                                className="h-16 w-16 shrink-0 rounded-full object-cover"
                            />

                            <div className="min-w-0">
                                <p className=" text-xs text-gray-500">
                                    <span className="font-medium text-gray-700">{userName}</span> {prefix}
                                </p>
                                <h3 className="truncate font-sans text-lg font-medium text-[#000000]">
                                    {r.targetName}
                                </h3>
                            </div>
                        </div>

                       <div className="flex shrink-0 gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                key={i}
                                    className={`h-6 w-6 ${
                                        i < r.rating ? "fill-yellow-300 text-yellow-300" : "text-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <p className="mt-4 line-clamp-3 font-sans text-base text-gray-600">
                        {r.comment}
                    </p>

                    <a href="#" className="mt-auto self-end pt-3 text-sm text-[#6A38F3] hover:underline">
                        ver mais
                    </a>

                </article>
            ))}
        </section>
    );
}