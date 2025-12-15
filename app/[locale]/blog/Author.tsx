"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@portabletext/react";

import { cn } from "@/lib/utils";

const Author = ({
  name,
  image,
  bio,
  className,
}: AuthorType & {
  className?: string;
}) => {
  const t = useTranslations("Blog");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className={cn(className, "h-fit bg-transparent px-3 py-2")}
        onPress={onOpen}
      >
        <div className="flex w-full gap-x-5 sm:items-center">
          <div className="shrink-0">
            {image ? (
              <Image
                className="size-12 rounded-full"
                src={urlFor(image).width(48).height(48).url()}
                width={48}
                height={48}
                alt={name}
              />
            ) : (
              <div className="flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                <span className="text-2xl font-semibold text-gray-700 uppercase dark:text-neutral-400">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="block grow text-start">
            <span className="font-semibold text-gray-800 dark:text-neutral-200">
              {name}
            </span>
          </div>
        </div>
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="mb-2 flex w-full gap-x-5 sm:items-center sm:gap-x-3">
                  <div className="shrink-0">
                    {image ? (
                      <Image
                        className="size-8 rounded-full"
                        src={urlFor(image).width(32).height(32).url()}
                        width={32}
                        height={32}
                        alt={name}
                      />
                    ) : (
                      <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                        <span className="text-2xl font-semibold text-gray-700 uppercase dark:text-neutral-400">
                          {name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <span className="grow text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    {name}
                  </span>
                </div>
              </ModalHeader>
              <ModalBody className="relative">
                {bio && (
                  <div className="text-sm text-gray-600 dark:text-neutral-400">
                    <PortableText value={bio} />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("close")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Author;
