import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../base-components/Button";
import { FormInput, FormSwitch } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Table from "../../base-components/Table";
import Tippy from "../../base-components/Tippy";

import _ from "lodash";
import Pagination from "../../components/Pagination";

<<<<<<< HEAD
import { SERVER_URL } from "../../config";

=======
>>>>>>> bf018c2 (ugly)
function Main() {
  const [isProfileSearch, setIsProfileSearch] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCampaign, setCurrentCampaign] = useState<string>("");
  const [pageCount, setPageCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { id } = useParams();

  const handleProfiles = async () => {
    const response = await axios(`/${id}/profile`, {
      params: {
        page: currentPage,
        count: rowsPerPage,
      },
    }).then((res) => res.data);

    if (response) {
      const { count: pageCount, data: profiles } = response;
      setProfiles(profiles);
      setPageCount(Math.ceil(pageCount / rowsPerPage));
    }
  };

  const handleCampaign = async () => {
    const response = await axios(`/campaign?_id=${id}`).then((res) => res.data);
    if (response) {
      const { name } = response;
      setCurrentCampaign(name);
    }
  };

  useEffect(() => {
    if (!id) return;
    handleCampaign();
    handleProfiles();
  }, [id, currentPage, rowsPerPage]);

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white opacity-70">
            CAMPAIGN NAME : {currentCampaign}
          </div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Button
              variant="primary"
              onClick={() => setIsProfileSearch(true)}
              className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent hover:opacity-70"
            >
              <Lucide icon="Plus" className="stroke-[1.3] w-4 h-4 mr-2" /> ADD
              PROFILES
            </Button>
          </div>
        </div>
        <div className="mt-3.5">
          <div className="flex flex-col box box--stacked">
            <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
              <div>
                <div className="relative">
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                  />
                  <FormInput
                    type="text"
                    placeholder="Search profiles..."
                    className="pl-9 sm:w-64 rounded-[0.5rem]"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-auto xl:overflow-visible">
              <Table className="border-b border-slate-200/60">
                <Table.Thead className="bg-slate-200 rounded-t-md">
                  <Table.Td className="uppercase">State</Table.Td>
                  <Table.Td className="uppercase">Full Name</Table.Td>
                  <Table.Td className="uppercase">Blocklisted</Table.Td>
                  <Table.Td className="uppercase">Title</Table.Td>
                  <Table.Td className="uppercase">Company</Table.Td>
                  <Table.Td className="uppercase">Step</Table.Td>
                  <Table.Td className="uppercase">Actions</Table.Td>
                </Table.Thead>
                <Table.Tbody>
                  {profiles.map((profile, id) => (
                    <Table.Tr key={id}>
                      <Table.Td>
                        <div className="flex items-center gap-x-2">
                          <div className="w-9 h-9 image-fit zoom-in">
                            <Tippy
                              as="img"
                              alt="Tailwise - Admin Dashboard Template"
                              className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                              src={profile.photoUrl}
                              content={
                                profile.firstName + " " + profile.lastName
                              }
                            />
                          </div>
                          <FormSwitch>
                            <FormSwitch.Input type="checkbox" defaultChecked />
                          </FormSwitch>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <p>{`${profile.firstName} ${profile.lastName}`}</p>
                      </Table.Td>
                      <Table.Td></Table.Td>
                      <Table.Td>
                        <p>{profile.title}</p>
                      </Table.Td>
                      <Table.Td>
                        <p>{profile.company}</p>
                      </Table.Td>
                      <Table.Td>
                        <p>0 / 4</p>
                      </Table.Td>
                      <Table.Td></Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              rowsPerPage={rowsPerPage}
              setCurrentPage={setCurrentPage}
              setPageCount={setPageCount}
              setRowsPerPage={setRowsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
