export interface DescriptionProps {
    title?: string;
    description?: string;
    imageUrl?: string;
}

const Description: React.FC<DescriptionProps> = (Props) => {
    return (
        <>
            <div className="flex items-center bg-white">
                <div className="w-20 h-20 relative  p-4">
                    <img src={Props.imageUrl} />
                </div>
                <div>
                    <h2 className="text-lg font-bold">{Props.title}</h2>
                    <p className="">{Props.description}</p>
                </div>
            </div>
        </>
    )
}
export default Description