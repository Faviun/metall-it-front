interface TestimonialCardProps {
    text: string;
    author: string;
    company: string;
  }
  
  const TestimonialCard = ({ text, author, company }: TestimonialCardProps) => {
    return (
      <div className="card-bg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-6 h-full flex flex-col">
        <div className="text-accent text-5xl mb-4">
          <i className="fas fa-quote-left"></i>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 italic flex-grow">"{text}"</p>
        <div className="mt-auto">
          <p className="font-bold">{author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>
        </div>
      </div>
    );
  };
  
  export default TestimonialCard;