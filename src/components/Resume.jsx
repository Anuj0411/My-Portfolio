import { Resume } from '../assets/index';
const MyResume = () => {
	return (
		<div>
			<a href={Resume} download>
				<button>Resume</button>
			</a>
		</div>
	);
};

export default MyResume;
