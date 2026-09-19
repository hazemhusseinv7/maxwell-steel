"use client";

import { Modal } from "@heroui/react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  thumbWidth?: number;
  thumbHeight?: number;
}

export function ImageLightbox({
  src,
  alt,
  thumbWidth = 160,
  thumbHeight = 120,
}: Props) {
  return (
    <Modal>
      <Modal.Trigger aria-label={`عرض ${alt}`}>
        <span className="border-border inline-block cursor-zoom-in overflow-hidden rounded-none border">
          <Image
            src={src}
            alt={alt}
            width={thumbWidth}
            height={thumbHeight}
            className="h-auto w-40 object-cover"
          />
        </span>
      </Modal.Trigger>
      <Modal.Backdrop />
      <Modal.Container size="lg">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Heading>{alt}</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <span className="relative block aspect-video w-full overflow-hidden rounded-none">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Modal.CloseTrigger>إغلاق</Modal.CloseTrigger>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}
