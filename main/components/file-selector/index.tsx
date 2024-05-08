import React from 'react';
import { useRef, useState } from 'react'
import './index.scss'
import { BtnPrimary, BtnSecondary } from '../../index';

export interface FileProps {
   defaultVal?: string;
   onImageSelect: (file: any) => void
}
export function FileSelector({ onImageSelect, defaultVal }: FileProps) {
   const [previewImage, setPreviewImage] = useState<any>(defaultVal);
   const fileRef = useRef<any>(null)

   const handleImageSelect = (event: any) => {
      const file = event.target.files[0];
      if (!file) {
         return;
      }

      const reader = new FileReader();
      reader.onload = function (event) {
         setPreviewImage(event?.target?.result);
         onImageSelect(file);
      };
      reader.readAsDataURL(file);
   }

   const handleClick = () => {
      fileRef?.current?.click()
   }
   
   return (
      <div id='file-selector' className='file-selector'>
         <div className='preview' >
            {
               previewImage || defaultVal ?
                  <img src={previewImage || defaultVal} alt="Preview" /> :
                  // <User />
                  '☃'
            }
            <BtnPrimary onClick={handleClick}>Change Image</BtnPrimary>
            <BtnSecondary>Delete Image</BtnSecondary>
         </div>
         <input
            ref={fileRef}
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageSelect}
         />
      </div>
   )
}
