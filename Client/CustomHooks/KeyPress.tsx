import { useState, useEffect } from 'react';
// Usage
function App() {
	// Call our hook for each key that we'd like to monitor
	const happyPress: boolean = useKeyPress('h');
	const sadPress: boolean = useKeyPress('s');
	const robotPress: boolean = useKeyPress('r');
	const foxPress: boolean = useKeyPress('f');
	return (
		<div>
			<div>h, s, r, f</div>
			<div>
				{happyPress && '😊'}
				{sadPress && '😢'}
				{robotPress && '🤖'}
				{foxPress && '🦊'}
			</div>
		</div>
	);
}
// Hook
export function useKeyPress(targetKey: string): boolean {
	// State for keeping track of whether key is pressed
	const [keyPressed, setKeyPressed] = useState(false);
	// If pressed key is our target key then set to true
	function downHandler({ key }: any): void {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	}
	// If released key is our target key then set to false
	const upHandler = ({ key }: any): void => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};
	// Add event listeners
	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []); // Empty array ensures that effect is only run on mount and unmount
	return keyPressed;
}
