import Generator from './generator/page'



export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-gray-900">
            <div>
                <div className='text-4xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text md:text-5xl font-bold mb-4 text-center'>Generate a unique avatar based on the text.</div>

                <Generator></Generator>

                <div className='flex flex-col items-center mt-18'>
                    <div className='mt-20'></div>
                    <div className='mt-20'></div>
                    <div className='text-gray-500'>Copyright © 2024 Unique Avatar Generator | Kamjin. All rights reserved.</div>
                </div>
            </div>
        </main>
    );
}
