import Image from "next/image"
import React from "react"
import Card from "../../Card"
import FileInput, { UrlFile } from "../../inputs/FileInput"
import InputLabel from "../../inputs/InputLabel"
import TagInput from "../../inputs/TagInput"
import ModelPreview from "../../visualization/ModelPreview"

export interface PreviewStepProps {
  thumbnail?: UrlFile;
  onThumbnailUpdate: (val: UrlFile) => void;

  tags?: string[];
  onSelectTags: (val: string[]) => void;
  
  model?: UrlFile;
  onSelectModel: (val: UrlFile) => void;
  
  modelAssets?: UrlFile[];
  onSelectModelAssets: (val: UrlFile[]) => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({ thumbnail, onThumbnailUpdate, tags, onSelectTags, model, onSelectModel, modelAssets, onSelectModelAssets  }) => {

  return (
    <div className="lg:flex flex-1">
      <div className="lg:w-1/3 lg:pr-2 lg:pb-0 pb-2">
        <Card className="flex flex-col justify-around h-full">
          <div>
            <InputLabel>Thumbnail</InputLabel>
            <div className="relative min-h-[180px]">
              {thumbnail && <Image className="mx-auto object-contain" alt="Preview Thumbnail" fill src={thumbnail?.url} />}
            </div>
          </div>
          
          <div>
            <InputLabel>3D Model</InputLabel>
            <FileInput selectedFiles={model && [model]} setSelectedFiles={(val) => onSelectModel(val[0])} accept={['.obj', '.ply']} />
          </div>
          <div>
            <InputLabel>Materials & Textures</InputLabel>
            <FileInput selectedFiles={modelAssets} setSelectedFiles={onSelectModelAssets} accept={['.mtl', 'image/*']} multiple={true} />
          </div>


          <div className="mt-3">
            <InputLabel>Tags</InputLabel>
            <TagInput tags={tags} setTags={onSelectTags} placeholder="Tags" />
          </div>
        </Card>
      </div>
      <div className="lg:w-2/3 lg:pl-2 lg:pt-0 pt-2 min-h-full">
        <Card className="h-full">
          <ModelPreview onThumbnailUpdate={(url) => onThumbnailUpdate({ filename: '', url})} model={model} modelAssets={modelAssets} />
        </Card>
      </div>

    </div>
  )
}
export default PreviewStep
