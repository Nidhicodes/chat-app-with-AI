const ChatPlaceHolder = () => {
	return (
		<div className='w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10'>
			<div className='flex flex-col items-center w-full justify-center py-10 gap-4'>
				<p className='text-3xl font-extralight mt-5 mb-2'>Start a new chat now!</p>
				<p className='w-1/2 text-center text-gray-primary text-sm text-muted-foreground'>
					Make calls, share your screen, share your photos and videos with your friends and family.
				</p>
			</div>
			<p className='w-1/2 mt-auto text-center text-gray-primary text-xs text-muted-foreground flex items-center justify-center gap-1'>
				 Welcome to our ChatApp.
			</p>
		</div>
	);
};
export default ChatPlaceHolder;