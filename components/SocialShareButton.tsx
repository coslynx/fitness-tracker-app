import { useState } from 'react';
import ShareThis from 'sharethis';

interface SocialShareButtonProps {
  title: string;
  url: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ title, url }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = () => {
    setIsSharing(true);
    ShareThis.init({
      attachment: {
        title: title,
        imageUrl: '', 
        description: 'Share my fitness progress!', 
        url: url,
      },
      services: ['facebook', 'twitter', 'linkedin', 'pinterest'],
    });
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleShare}
      disabled={isSharing}
    >
      {isSharing ? 'Sharing...' : 'Share'}
    </button>
  );
};

export default SocialShareButton;