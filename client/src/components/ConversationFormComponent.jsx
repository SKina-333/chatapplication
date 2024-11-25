import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import InputGroupComponent from "./InputGroupComponent";

export default function ConversationFormComponent({ open, setOpen }) {
  const people = [
    { id: 1, name: "Annette Black" },
    { id: 2, name: "Cody Fisher" },
    { id: 3, name: "Courtney Henry" },
    { id: 4, name: "Kathryn Murphy" },
    { id: 5, name: "Theresa Webb" },
  ];
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3  sm:mt-5 flex flex-col gap-5">
                <DialogTitle
                  as="h3"
                  className="text-center text-base font-semibold text-gray-900"
                >
                  Create New Conversation
                </DialogTitle>
                <div className="mt-2 flex flex-col gap-5">
                  <fieldset>
                    <legend className="text-base font-semibold text-gray-900">
                      Members
                    </legend>
                    <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                      {people.map((person, personIdx) => (
                        <div
                          key={personIdx}
                          className="relative flex items-start py-4"
                        >
                          <div className="min-w-0 flex-1 text-sm/6">
                            <label
                              htmlFor={`person-${person.id}`}
                              className="select-none font-medium text-gray-900"
                            >
                              {person.name}
                            </label>
                          </div>
                          <div className="ml-3 flex h-6 items-center">
                            <input
                              id={`person-${person.id}`}
                              name={`person-${person.id}`}
                              type="checkbox"
                              className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                  <InputGroupComponent
                    inputName="groupName"
                    type="text"
                    placeholder="Type group name"
                    value=""
                    labelName="Group Chat Name"
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Submit
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
