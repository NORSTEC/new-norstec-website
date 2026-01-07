
const LinkedinView = () => {
    return (
         <div className="relative w-full h-screen flex items-center justify-center">
            <iframe 
                src="https://www.juicer.io/api/feeds/norstec/iframe?filter=linkedin&per=12"
                width="1000" 
                height="1000" >
            </iframe>
        </div>
    );
}

export default LinkedinView;