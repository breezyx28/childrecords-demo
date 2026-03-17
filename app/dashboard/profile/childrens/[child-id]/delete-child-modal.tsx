import Button from "@/components/buttons/button";
import OutlineButton from "@/components/buttons/OutlineButton";
import Dialog from "@/components/modals/dialog";
import { useDeleteChildMutation } from "@/redux/endpoints/account";
import {
  useGetParentChildrenQuery,
  useSwitchChildrenMutation,
} from "@/redux/endpoints/child";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const DeleteChildModal = ({ childId }: { childId: string | number }) => {
  const [nextChild, setNextChild] = React.useState<any>(null);
  const [agree, setAgree] = useState<boolean>(false);
  const [deleteChild, { isLoading }] = useDeleteChildMutation();
  const { data: children, isFetching } = useGetParentChildrenQuery({});
  const [switchChild, { data: switchedChild }] = useSwitchChildrenMutation();

  React.useEffect(() => {
    if (children?.length > 0) {
      const nextChild = children?.find(
        (item: any) => item.id !== childId && item?.selected === false
      );
      setNextChild(nextChild);
    }
  }, [children]);

  return (
    <div>
      <Dialog
        id={`delete-child-${childId}`}
        contentClass="md:w-full w-auto"
        closeBtn
      >
        <div className="w-full flex flex-col gap-y-[32px]">
          <div className="flex flex-col gap-y-[12px] text-center">
            <h1 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
              Delete Child Information?
            </h1>
            <p className="text-[#83868B] text-[16px] font-[700] leading-[19.84px]">
              By deleting the child information you will not be able to access
              the data anymore
            </p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <div className="form-control">
              <label className="cursor-pointer label">
                <div className="flex items-center gap-x-[8px] text-[#83868B]">
                  <input
                    id="delete-child-agree"
                    type="checkbox"
                    onChange={(e) => setAgree(e.currentTarget.checked)}
                    className="checkbox !border-2 [--chkbg:theme(colors.primary.600)] [--chkfg:white] checked:border-primary-600"
                    required
                  />
                  <span className="text-[16px] font-[500] leading-[19.84px]">
                    I Understand
                  </span>
                </div>
              </label>
            </div>
            <Button
              text="Delete"
              disabled={!agree}
              isLoading={isLoading}
              className={twMerge(
                "!bg-error-600 !text-white !text-[16px] !font-[700] !leading-[19.84px] border-2 !shadow-none",
                !agree && "!opacity-50 !cursor-not-allowed hover:none"
              )}
              buttonAttributes={{
                async onClick() {
                  try {
                    // Delete child first
                    await deleteChild({ child_id: childId }).unwrap();

                    // If deletion successful, switch to next child
                    if (nextChild?.id) {
                      await switchChild({ child_id: nextChild.id }).unwrap();
                      document
                        .getElementById(`delete-child-${childId}`)
                        ?.click();

                      setTimeout(() => {
                        window.location.href =
                          "/dashboard/profile/childrens/" + nextChild.id;
                      }, 2000);
                    } else {
                      window.location.href = "/add-child";
                    }

                    // Close modal
                  } catch (err) {
                    console.error("Error during delete/switch operation:", err);
                  }
                },
              }}
            />

            <OutlineButton
              disabled={isLoading}
              text="Cancel"
              className="w-full !border2 !text-[16px] !font-[700] !leading-[19.84px]"
              options={{
                onClick() {
                  document.getElementById(`delete-child-${childId}`)?.click();
                },
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteChildModal;
