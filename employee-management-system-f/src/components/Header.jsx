export default function Header({imgSrc, title}) {    

    return (
             <header className="flex flex-row items-center">
                <img src={imgSrc} alt="Logo" className="w-32 h-auto mb-4" />
                <h1 className="text-black text-3xl">{title}</h1>
        </header>
    );
}