import axios from "axios";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";

import Lucide from "../../base-components/Lucide";
import Button from "../../base-components/Button";
import CampaignList from "../../components/CampaignList";
import Pagination from "../../components/Pagination";
import CreateCampaignDialog from "../../components/CreateCampaignDialog";

import { SERVER_URL } from "../../config";

import { useAppDispatch } from "../../stores/hooks";
import { AuthContext } from "../../providers/AuthProvider";
import { setLinkedinLoader } from "../../stores/linkedinLoaderSlice";

function Main() {
  const dispatch = useAppDispatch();

  const { account } = useContext(AuthContext);
  const [camAnchor, setCamAnchor] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadCampaignList = async () => {
    const response = await axios(`/campaigns`).then(
      (response) => response.data
    );
    setCampaigns(response);
  };

  const onCampaignCreate = async ({
    campaignName,
    searchUrl,
  }: {
    campaignName: string;
    searchUrl: string;
  }) => {
    const response = await axios("/campaign", {
      method: "POST",
      data: {
        campaign: campaignName,
        query: searchUrl,
      },
    }).then((res) => res.data);

    if (response) {
      setCampaigns([...campaigns, response]);
    }
    setCamAnchor(false);
  };

  const onCreateClick = () => {
    if (!account?.hasLinkedin) {
      dispatch(setLinkedinLoader(true));
    }
    setCamAnchor(true);
  };

  useEffect(() => {
    loadCampaignList();
  }, [currentPage, rowsPerPage]);

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Campaigns
          </div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Button
              variant="primary"
              className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent  hover:opacity-70"
              onClick={onCreateClick}
            >
              <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />{" "}
              Create Campaign
            </Button>
          </div>
        </div>

        <div className="mt-3.5">
          <div className="flex flex-col box box--stacked">
            <CampaignList list={campaigns} />
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
        <CreateCampaignDialog
          open={camAnchor}
          onClose={() => setCamAnchor(false)}
          onCreate={onCampaignCreate}
        />
      </div>
    </div>
  );
}

export default Main;
