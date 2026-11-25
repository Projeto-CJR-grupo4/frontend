import { Star } from 'lucide-react';

type Props = {
    value: number;
    onChange?: (n: number) => void;
    size?: number;
};

export default function Stars({ value, onChange, size = 24 }: Props) {
    return (
        <div className="flex shrink-0 gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => {
                const star = (
                    <Star
                        style={{ width: size, height: size }}
                        className={i < value ? 'fill-yellow-300 text-yellow-300' : 'text-gray-300'}
                    />
                );
                return onChange ? (
                    <button
                        key={i}
                        type="button"
                        aria-label={`${i + 1} estrelas`}
                        onClick={() => onChange(i + 1)}
                        className="cursor-pointer transition hover:scale-110"
                    >
                        {star}
                    </button>
                ) : (
                    <span key={i}>{star}</span>
                );
            })}
        </div>
    );
}