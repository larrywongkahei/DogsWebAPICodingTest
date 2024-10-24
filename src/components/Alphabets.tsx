
type Props = {
    updateFilterAlphabet: (alpha: string) => void;
    startWithFilterInitial: string;
}

export default function Alphabets({startWithFilterInitial, updateFilterAlphabet}: Props) {

    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return (
        <div className="grid grid-cols-11 w-4/5 mx-auto">
            {
                alphabets.map((alpha, index) => {
                    return (
                        <div key={index}  className="">
                            <p className={`text-center text-cyan-400 underline cursor-pointer inline px-3 py-2 ${startWithFilterInitial === alpha && "rounded-full bg-slate-500" }`} onClick={() => {updateFilterAlphabet(alpha)}}>
                                {alpha}
                            </p>
                        </div>
                    )
                })
            }

        </div>
    )
}