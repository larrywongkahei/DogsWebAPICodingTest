
type Props = {
    updateFilterAlphabet: (alpha: string) => void;
}

export default function Alphabets({updateFilterAlphabet}: Props) {

    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return (
        <div className="grid grid-cols-11 w-4/5 mx-auto">
            {
                alphabets.map((alpha, index) => {
                    return (
                        <div key={index}  className="">
                            <p className="text-center text-cyan-400 underline cursor-pointer inline" onClick={() => {updateFilterAlphabet(alpha)}}>
                                {alpha}
                            </p>
                        </div>
                    )
                })
            }

        </div>
    )
}