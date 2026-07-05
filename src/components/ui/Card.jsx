export default function Card({ children }) {
    return (
        <div className="
          bg-white
  rounded-xl
  shadow-md
  border
  border-gray-200
  p-6
  text-gray-900
  hover:-translate-y-1
  hover:shadow-xl
  transition-all
  duration-300
  "
        >
            {children}
        </div>
    );
}