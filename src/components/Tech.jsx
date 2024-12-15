import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
const Tech = () => {
	return (
		<div className="flex flex-row justify-center gap-10 flex-wrap">
			{technologies.map((technology) => {
				return <div className="w-28 h-28" key={technology.name}>
					<BallCanvas icon={technology.icon} />
				</div>;
			})}
		</div>
	);
};

export default SectionWrapper(Tech, '');
