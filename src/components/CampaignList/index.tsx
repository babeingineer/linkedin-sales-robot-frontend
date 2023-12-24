import Lucide from "../../base-components/Lucide";
import { Menu, Popover } from "../../base-components/Headless";
import Pagination from "../../base-components/Pagination";
import { FormCheck, FormInput, FormSelect } from "../../base-components/Form";
// import categories from "../../listItems/categories";
import Button from "../../base-components/Button";
import { formatCurrency } from "../../utils/helper";
import Table from "../../base-components/Table";
import clsx from "clsx";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Progress from "../../base-components/Progress";

interface ICampaignListProps {
  list: any[];
}

function Main({ list }: ICampaignListProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
        <div>
          <div className="relative">
            <Lucide
              icon="Search"
              className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
            />
            <FormInput
              type="text"
              placeholder="Search campaigns..."
              className="pl-9 sm:w-64 rounded-[0.5rem]"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
          <Menu>
            <Menu.Button
              as={Button}
              variant="outline-secondary"
              className="w-full sm:w-auto"
            >
              <Lucide icon="Download" className="stroke-[1.3] w-4 h-4 mr-2" />
              Export
              <Lucide
                icon="ChevronDown"
                className="stroke-[1.3] w-4 h-4 ml-2"
              />
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="FileBarChart" className="w-4 h-4 mr-2" /> PDF
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileBarChart" className="w-4 h-4 mr-2" />
                CSV
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <Popover className="inline-block">
            {({ close }) => (
              <>
                <Popover.Button
                  as={Button}
                  variant="outline-secondary"
                  className="w-full sm:w-auto"
                >
                  <Lucide
                    icon="ArrowDownWideNarrow"
                    className="stroke-[1.3] w-4 h-4 mr-2"
                  />
                  Filter
                  <div className="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full bg-slate-100">
                    3
                  </div>
                </Popover.Button>
                <Popover.Panel placement="bottom-end">
                  <div className="p-2">
                    <div>
                      <div className="text-left text-slate-500">Status</div>
                      <FormSelect className="flex-1 mt-2">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </FormSelect>
                    </div>
                    <div className="mt-3">
                      <div className="text-left text-slate-500">Products</div>
                      <FormSelect className="flex-1 mt-2">
                        <option value="1 - 50">1 - 50</option>
                        <option value="51 - 100">50 - 100</option>
                        <option value="> 100">&gt; 100</option>
                      </FormSelect>
                    </div>
                    <div className="flex items-center mt-4">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          close();
                        }}
                        className="w-32 ml-auto"
                      >
                        Close
                      </Button>
                      <Button variant="primary" className="w-32 ml-2">
                        Apply
                      </Button>
                    </div>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </div>
      </div>
      <div className="overflow-auto xl:overflow-visible">
        <Table
          className="border-b border-slate-200/60 cursor-pointer"
          hover={true}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="w-5 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                <FormCheck.Input type="checkbox" />
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                NAME
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                SOURCE
              </Table.Td>
              <Table.Td className="py-4 font-medium text-center border-t whitespace-nowrap bg-slate-50 border-slate-200/60 text-slate-500">
                STATUS
              </Table.Td>
              <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                CAMPAIGN PROGRESS (IN %)
              </Table.Td>
              <Table.Td className="py-4 font-medium text-center border-t w-36 bg-slate-50 border-slate-200/60 text-slate-500">
                ACTION COUNT
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {list.map((listItem, itemKey) => (
              <Table.Tr
                key={itemKey}
                className="[&_td]:last:border-b-0"
                onClick={() => navigate(`/campaign/${listItem._id}`)}
              >
                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                  <FormCheck.Input type="checkbox" />
                </Table.Td>
                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                  <a href="" className="font-medium whitespace-nowrap">
                    {listItem.name}
                  </a>
                </Table.Td>
                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                  <div className="mt-0.5 text-xs text-slate-500 whitespace-nowrap">
                    Salesnav Search
                  </div>
                </Table.Td>
                <Table.Td className="py-4 text-center border-dashed dark:bg-darkmode-600">
                  <span
                    className={clsx([
                      "sm:ml-auto mr-auto sm:mr-0 group flex items-center justify-center text-xs font-medium rounded-lg border px-2.5 py-1",
                      "[&.success]:border-success/10 [&.success]:bg-success/10 [&.success]:text-success",
                      "[&.primary]:border-primary/10 [&.primary]:bg-primary/10 [&.primary]:text-primary",
                      "[&.pending]:border-pending/10 [&.pending]:bg-pending/10 [&.pending]:text-pending",
                      ["primary", "success", "pending"][2],
                    ])}
                  >
                    <div
                      className={clsx([
                        "w-1 h-1 mr-1.5 rounded-full border",
                        "group-[.success]:border-success/50 group-[.success]:bg-success/50",
                        "group-[.primary]:border-primary/50 group-[.primary]:bg-primary/50",
                        "group-[.pending]:border-pending/50 group-[.pending]:bg-pending/50",
                      ])}
                    ></div>
                    <span className="-mt-px">CREATED</span>
                  </span>
                </Table.Td>
                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                  <div
                    className={clsx([
                      "flex flex-col items-center gap-y-1",
                      // { "text-success": listItem.isActive },
                      // { "text-danger": !listItem.isActive },
                    ])}
                  >
                    <Progress className="h-7 relative">
                      <Progress.Bar
                        className="w-0"
                        role="progressbar"
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></Progress.Bar>
                      <div className="absolute top-[50%] transform -translate-y-1/2 w-full flex justify-between px-1">
                        <p>Importing</p>
                        <p>0%</p>
                      </div>
                    </Progress>
                    <Progress className="h-7 relative">
                      <Progress.Bar
                        className="w-0"
                        role="progressbar"
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></Progress.Bar>
                      <div className="absolute top-[50%] transform -translate-y-1/2 w-full flex justify-between px-1">
                        <p>Execution</p>
                        <p>0%</p>
                      </div>
                    </Progress>
                    <div className="ml-1.5 whitespace-nowrap">
                      {/*listItem.isActive ? "Active" : "Inactive"*/}
                    </div>
                  </div>
                </Table.Td>
                <Table.Td className="relative py-4 border-dashed dark:bg-darkmode-600">
                  <div className="flex items-center justify-center">
                    <Menu className="h-5">
                      <Menu.Button className="w-5 h-5 text-slate-500">
                        <Lucide
                          icon="MoreVertical"
                          className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                        />
                      </Menu.Button>
                      <Menu.Items className="w-40">
                        <Menu.Item>
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                          Edit
                        </Menu.Item>
                        <Menu.Item className="text-danger">
                          <Lucide icon="Trash2" className="w-4 h-4 mr-2" />
                          Delete
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}

export default Main;
