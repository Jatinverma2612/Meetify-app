import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200/50 backdrop-blur-sm border border-base-300 hover:border-primary/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className="card-body p-5">
        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar">
            <div className="w-14 rounded-full ring-2 ring-base-300 group-hover:ring-primary/50 transition-all duration-300">
              <img src={friend.profilePic} alt={friend.fullName} className="object-cover" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors duration-300">
              {friend.fullName}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <span className="badge badge-secondary badge-outline border-secondary/30 bg-secondary/5 text-xs py-3 px-3 rounded-xl transition-all hover:bg-secondary/10">
            {getLanguageFlag(friend.nativeLanguage)}
            <span className="font-medium ml-1">Native: {friend.nativeLanguage}</span>
          </span>
          <span className="badge badge-accent badge-outline border-accent/30 bg-accent/5 text-xs py-3 px-3 rounded-xl transition-all hover:bg-accent/10">
            {getLanguageFlag(friend.learningLanguage)}
            <span className="font-medium ml-1">Learning: {friend.learningLanguage}</span>
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-primary w-full rounded-xl hover:scale-[1.02] shadow-sm hover:shadow-primary/25 transition-all duration-300">
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}