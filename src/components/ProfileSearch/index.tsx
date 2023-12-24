import { useContext, useEffect, useState } from 'react';
import Lucide from '../../base-components/Lucide';
import { FormInput, FormCheck } from '../../base-components/Form';
import Button from '../../base-components/Button';
import ResponseAlert from '../../components/ResponseAlert';
import { SERVER_URL } from '../../config';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { SpinnerContext } from '../../providers/SpinnerProvider';

interface IProfileSearchProps {
    refreshProfiles: () => void;
}

function Main({
    refreshProfiles
}: IProfileSearchProps) {
    const [totalCheck, setTotalCheck] = useState<boolean>(false);
    const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const { setLoading } = useContext(SpinnerContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(10);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [isSaveSuccess, setISSaveSuccess] = useState<boolean>(false);
    const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
    const { id } = useParams();

    const handleProfiles = async () => {
        await setLoading(true);
        const res = await fetch(`${SERVER_URL}/profiles?query=${filter}&page=${currentPage}&campaignId=${id}`, {
            method: 'GET'
        });
        const searchResult = await res.json();
        setSearchResults(searchResult.items);
        await setLoading(false);
    }

    const handleAllSave = async () => {
        const response = await fetch(`${SERVER_URL}/profiles/all`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter, id
            })
        })

        const message = await response.text();
        if (response.status === 200 && message) {
            handleProfiles();
        }
    }

    const onUserCheckToggle = (userId: string) => (e: any) => {
        const checked = e.target.checked;
        if (!checked) {
            setCheckedUsers(checkedUsers.filter(checkedId => checkedId !== userId));
        } else {
            setCheckedUsers([...checkedUsers, userId]);
        }
    }

    const onTotalCheck = (e: any) => {
        const checked = e.target.checked;
        if (checked) {
            const checkedIds = searchResults.filter(item => !item.issaved).map(item => item.link);
            setCheckedUsers(checkedIds);
        } else {
            setCheckedUsers([]);
        }
        setTotalCheck(checked);
    }

    const onProfileSave = async () => {
        const targetProfiles = checkedUsers.map(checkedId => searchResults.find(item => item.link === checkedId)).map(item => ({ ...item, campaignId: id }));

        try {
            const response = await fetch(`${SERVER_URL}/profiles/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(targetProfiles)
            });

            setIsShowAlert(true);
            if (response.status === 200) {
                setISSaveSuccess(true);

                const results = searchResults.map(item => checkedUsers.find(checkedId => checkedId === item.link) ? ({ ...item, issaved: true }) : item)
                setSearchResults(results);

                // const newProfiles = await response.json();
                // refreshProfiles(newProfiles);

                setCheckedUsers([]);
                refreshProfiles();
            } else {
                setISSaveSuccess(false);
            }
        } catch (err) {
            console.error('BAD REQUEST', err)

            setIsShowAlert(true);
            setISSaveSuccess(false);
        }
    }

    const isUserChecked = (userId: string) => {
        return !!checkedUsers.find(checkedId => checkedId === userId);
    }

    useEffect(() => {
        if (searchResults.length === 0) return;
        handleProfiles();
    }, [currentPage]);

    return (
        <div className="grid grid-cols-12 gap-y-10 gap-x-6">
            <div className="flex flex-col col-span-12 xl:col-span-12 gap-y-10">
                <div className="p-5 mt-3.5 box box--stacked">
                    <div className="relative">
                        <FormInput
                            type="text"
                            className="py-3 pr-11"
                            rounded
                            placeholder="Search members..."
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center justify-center w-10 my-1 mr-1 rounded-full bg-primary cursor-pointer hover:opacity-90">
                            <Lucide
                                icon="Search"
                                className="stroke-[1.3] w-4 h-4 text-white"
                                onClick={handleProfiles}
                            />
                        </div>
                    </div>
                    <div className='flex mt-5 col-span-12 xl:col-span-12'>
                        <div className='flex items-center justify-end w-full'>
                            <FormCheck.Input
                                className="border"
                                type="checkbox"
                                checked={totalCheck}
                                onChange={onTotalCheck}
                            />
                            <div className="ml-3 mr-3 text-xs text-slate-500">
                                10 selected
                            </div>
                            <Button className='mr-3' variant="primary" disabled={checkedUsers.length === 0} onClick={onProfileSave}>
                                SAVE
                            </Button>
                            <div className="ml-3 mr-3 text-xs text-slate-500 font-semibold">
                                100 profiles
                            </div>
                            <Button className='mr-3' variant="primary" onClick={handleAllSave}>
                                ALL SAVE
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-3">
                        {searchResults.map(
                            (linkedInUser: any, userId: number) => (
                                <div
                                    className="relative flex flex-col items-center gap-5 p-3 border border-dashed rounded-lg sm:flex-row border-slate-300/60"
                                    key={userId}
                                >
                                    <div className="mr-3">
                                        <FormCheck.Input
                                            className="border"
                                            type="checkbox"
                                            disabled={linkedInUser.issaved}
                                            checked={!linkedInUser.issaved && isUserChecked(linkedInUser.link)}
                                            onChange={onUserCheckToggle(linkedInUser.link)}
                                        />
                                    </div>
                                    <div>
                                        <div className="w-24 h-24 rounded-full overflow-hidden image-fit border-[3px] border-slate-200/70">
                                            <img
                                                alt="Tailwise - Admin Dashboard Template"
                                                className="rounded-md"
                                                src={linkedInUser.img}
                                            />
                                        </div>
                                    </div>
                                    <div className="-mt-1">
                                        <div className="ml-3 text-left text-xs text-slate-800 font-bold">
                                            {linkedInUser.first_name + " " + linkedInUser.last_name}
                                        </div>
                                        <div className="ml-3 text-left text-xs text-slate-500 sm:max-w-[100px]  md:max-w-[500px]">
                                            {linkedInUser.role}
                                        </div>
                                        <div className="flex items-center mt-2.5 text-xs text-slate-500 dark:text-slate-500">
                                            <Lucide
                                                icon="Link"
                                                className="w-2.5 h-2.5 mr-1.5 stroke-[2]"
                                            />
                                            <a
                                                href=""
                                                className="truncate underline decoration-dotted underline-offset-[3px] decoration-slate-300"
                                            >
                                                {linkedInUser.link}
                                            </a>
                                        </div>
                                        <div className="flex items-center justify-center mt-4 sm:justify-start">
                                            {/* <div className="flex text-left">
                                                {linkedInUser.description}
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        <Button variant="primary" disabled={linkedInUser.issaved}>
                                            {linkedInUser.issaved ? 'Saved' : 'Save'}
                                        </Button>
                                        {/* <Button variant="primary">
                      Saving
                      <LoadingIcon
                        icon="oval"
                        color="white"
                        className="w-4 h-4 ml-2"
                      />
                    </Button> */}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className='w-full col-span-12'>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount} setPageCount={setPageCount} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
            </div>
            <ResponseAlert buttonModalPreview={isShowAlert} setButtonModalPreview={setIsShowAlert} isSuccess={isSaveSuccess} />
        </div>
    );
}

export default Main;

