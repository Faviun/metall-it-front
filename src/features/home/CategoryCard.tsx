import { Link } from 'react-router-dom';

interface CategoryCardProps {
  icon: React.ReactNode;
  name: string;
  link: string;
}

const CategoryCard = ({ icon, name, link }: CategoryCardProps) => {
  return (
    <Link to={link} className="block group">
      <div className="card-bg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border 
                      rounded-lg p-6 text-center transition-all duration-300 
                      hover:border-accent hover:shadow-lg hover:-translate-y-1">
        <div className="text-accent text-5xl mb-4 flex justify-center transition-transform duration-300 group-hover:scale-110">
            {icon}
        </div>
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;