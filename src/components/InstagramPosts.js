import React, { useEffect, useState } from 'react';
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const InstagramEmbed = ({ urls, currentPostIndex, goToNextPost, goToPreviousPost }) => {
  const currentUrl = urls[currentPostIndex];

  useEffect(() => {
    
    const loadScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = "//www.instagram.com/embed.js";
      document.body.appendChild(script);

      return script;
    };

    // Remove existing script and load a new one
    let existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    const newScript = loadScript();

    // Force the Instagram script to reprocess embeds
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }

    return () => {
      if (newScript) {
        newScript.remove();
      }
    };
  }, [currentPostIndex]); // Depend on currentPostIndex

  return (
    <div style={{ position: 'relative', maxWidth: '540px', margin: 'auto' }}>
      <IconButton 
        icon={<ArrowBackIcon />} 
        onClick={goToPreviousPost} 
        position="absolute"
        left="0"
        top="50%"
        transform="translateY(-50%)"
      />

      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={currentUrl}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: '0',
          width: '99.375%',
          width: '-webkit-calc(100% - 2px)',
          width: 'calc(100% - 2px)'
        }}
      >
        {/* Content of the Instagram post will be dynamically inserted by Instagram's script */}
      </blockquote>

      <IconButton 
        icon={<ArrowForwardIcon />} 
        onClick={goToNextPost} 
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-50%)"
      />
    </div>
  );
};

export default InstagramEmbed;
