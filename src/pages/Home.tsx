import DogsUI from '../components/DogDetails/DogsUI';

export default function Home(): JSX.Element {
    return (
        <div className='h-screen'>
            <div className='w-full'>
                <DogsUI />
            </div>
        </div>

    )
}