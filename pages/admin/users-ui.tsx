import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { connect } from 'react-redux';
import moment from 'moment';
import { Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';

import Pagination from '../../components/pagination/pagination';
import { getUsers, restDeleteUser } from '../../redux/actions';
import { ReducerType } from '../../redux/reducers/rootReducer';
import { truncate, format } from '../../utils/functions/helpers';
import Modal from '../../components/modal/modal';

const AdminUserSUIPage: React.FunctionComponent = (props: any) => {
  const {
    users,
    list,
    totalDocs,
    listIsLoading,
    listIsSuccess,
    listIsError,
    listMessage,
    deleteUserIsPending,
    deleteUserIsSuccess,
    deleteUserIsError,
    deleteUserMessage
  } = props.listState;

  const router = useRouter();
  const [addNewUser, setAddNewUser] = useState<boolean>(false);
  const [limit, setLimit] = useState<number | string>(100);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<undefined | string>('createdAt');
  const [filterBy, setFilterBy] = useState<undefined | string>('all');
  const [sort, setSort] = useState<undefined | string>('asc');
  const [search, setSearch] = useState<undefined | string>('');

  useEffect(() => {
    let filteredUrl = `/admin/users?page=${page}&limit=${limit}&sortBy=${sortBy}&OrderBy=${sort}&filterBy=role&role=${filterBy}`;

    if (search) {
      filteredUrl = `/admin/users?page=${page}&limit=${limit}&sortBy=${sortBy}&OrderBy=${sort}&filterBy=role&role=${filterBy}&search=${search}`;
    }
    props.getUsers(filteredUrl);
  }, [page, limit, sortBy, filterBy, sort, search]);

  useEffect(() => {
    if (deleteUserIsSuccess || deleteUserIsError) {
      setShowAlert(() => true);
      setOpen(() => false);

      const timer = setTimeout(() => {
        setShowAlert(() => false);
        props.restDeleteUser();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [deleteUserIsSuccess, deleteUserIsError]);

  useEffect(() => {
    const redirectToSignUp = () => {
      if (addNewUser) {
        router.push('/admin/add-user');
      }
    };
    redirectToSignUp();
  }, [addNewUser]);

  if (addNewUser) {
    router.push('/admin/add-user');
  }

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  const handleOpen = (id: string) => {
    setId(() => id);
    setOpen(() => true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Head>
        <title>Admin</title>
      </Head>
      <meta name="description" content="admin" />
      <div className="text-[18px] max-w-[1250px] mx-auto p-5 mt-11 ">
        {/* {listIsLoading && (
          <div className=" flex items-center justify-center ">
            <CircularProgress color="secondary" />
          </div>
        )} */}

        <div>
          {showAlert && (
            <Alert
              variant="filled"
              severity={deleteUserIsError ? 'error' : 'success'}
              onClose={() => setShowAlert(false)}
            >
              {deleteUserMessage}
            </Alert>
          )}

          <Modal handleOpen={handleOpen} handleClose={handleClose} open={open} id={id} />

          <div className="md:flex gap-6  justify-between items-center flex-wrap">
            <button
              onClick={() => setAddNewUser(true)}
              className="bg-blue-500 text-white hover:bg-blue-400  font-bold py-2 px-4 rounded  items-center block mb-4 md:mb-0 w-[85%] md:max-w-[200px] overflow-hidden "
            >
              Add New User
            </button>
            {totalDocs > 0 && (
              <div className="mb-4 md:mb-0">
                <Pagination handleChange={handleChange} page={page} totalPages={totalDocs} />
              </div>
            )}
            {totalDocs > 0 && (
              <div className="flex  max-w-[85%]  sm:max-w-full mb-4">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Search Users"
                  aria-label="Search Users"
                  aria-describedby="button-addon2"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button
                  className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center "
                  type="button"
                  id="button-addon2"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {totalDocs > 0 && (
            <div className="md:flex gap-6 mb-4 justify-between items-center flex-wrap">
              <button
                onClick={() => setFilterBy('all')}
                className="bg-blue-500 text-white hover:bg-blue-400  font-bold py-2 px-4 rounded  items-center block md:mb-0 w-[85%] md:max-w-[200px] overflow-hidden mb-4"
              >
                Users & Admins
              </button>
              <button
                className="bg-blue-500 text-white hover:bg-blue-400  font-bold py-2 px-4 rounded  items-center block mb-4 md:mb-0 w-[85%] md:max-w-[200px] overflow-hidden"
                onClick={() => setFilterBy('user')}
              >
                Only Users
              </button>
              <button
                onClick={() => setFilterBy('admin')}
                className="bg-blue-500 text-white hover:bg-blue-400  font-bold py-2 px-4 rounded  items-center block mb-4 md:mb-0 w-[85%] md:max-w-[200px] overflow-hidden mb-4"
              >
                Only Admins
              </button>
            </div>
          )}

          {totalDocs > 0 && (
            <div className="md:flex gap-6 mb-4 justify-between items-center flex-wrap">
              <div>
                <select
                  className="px-4 py-3    focus:-blue-100 focus:ring-0  hover:bg-blue-400   w-full rounded-md bg-blue-500 border-transparent focus:border-gray-500 focus:bg-transparent
                 max-w-[85%]  sm:max-w-full font-semibold mb-4"
                  placeholder="Select a brand"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option defaultValue="createdAt" value="createdAt">
                    Sort By default
                  </option>

                  <option value="firstName">FirstName</option>
                  <option value="lastName">LastName</option>
                  <option value="email"> Email</option>
                </select>
              </div>
              <div>
                <select
                  className="px-4 py-3    focus:-blue-100 focus:ring-0  hover:bg-blue-400   w-full rounded-md bg-blue-500 border-transparent focus:border-gray-500 focus:bg-transparent
                max-w-[85%]  sm:max-w-full  font-semibold mb-4
              "
                  placeholder="Select a brand"
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
                  <option defaultValue="asc" value="asc">
                    Sort by ascending
                  </option>
                  <option value="desc">Sort by descending </option>
                </select>
              </div>

              <div className="flex gap-4 mb-4  max-w-[85%] ">
                <button className="bg-blue-500 text-white hover:bg-blue-400  font-bold py-2 px-4 rounded  items-center block mb-4 md:mb-0 w-[85%] md:max-w-[200px] overflow-hidden">
                  limit
                </button>
                <select
                  className="focus:-blue-100 focus:ring-0  hover:bg-blue-100   rounded-md bg-gray-500 border-transparent focus:border-gray-500 focus:bg-transparent font-bold py-2 px-4   items-center block mb-4 md:mb-0 w-[85%] md:max-w-[200px] "
                  placeholder="Select a brand"
                  value={limit}
                  onChange={e => setLimit(e.target.value)}
                >
                  {totalDocs &&
                    Array.from(Array(totalDocs > 100 ? 100 : totalDocs).keys()).map((day, index) => {
                      return (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          )}

          {!users.length && (
            <div
              className="p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700  dark:bg-gray-800 dark:border-gray-700 
                transition transform duration-300 ease-out grid gap-y-2 overflow-hidden cursor-pointer "
            >
              No User found
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-[4rem]  ">
            {users &&
              users.map((user: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700  dark:bg-gray-800 dark:border-gray-700 
               hover:scale-105 transition transform duration-300 ease-out grid gap-y-2 min-w-[380px] overflow-hidden cursor-pointer  hover:drop-shadow-xl"
                  >
                    <div className="flex gap-4">
                      <p className="text-gray-500 truncate dark:text-gray-400 min-w-[100px]">First Name: </p>
                      <p className=" text-gray-500 truncate dark:text-gray-400"> {user.firstName}</p>
                    </div>

                    <div className="flex gap-4">
                      <p className="text-gray-500 truncate dark:text-gray-400 min-w-[100px]">Last Name: </p>
                      <p className=" text-gray-500 truncate dark:text-gray-400"> {user.lastName}</p>
                    </div>

                    <div className="flex gap-4">
                      <p className="text-gray-500 truncate dark:text-gray-400 min-w-[100px]">Email:</p>
                      <p className=" text-gray-500 truncate dark:text-gray-400"> {truncate(user.email, 20)}</p>
                    </div>

                    <div className="flex gap-4">
                      <p className="text-gray-500 truncate dark:text-gray-400 min-w-[100px]"> Gender: </p>
                      <p className=" text-gray-500 truncate dark:text-gray-400"> {user.gender}</p>
                    </div>

                    <div className="flex gap-4">
                      <p className="text-gray-500 truncate dark:text-gray-400 min-w-[100px]"> Role: </p>
                      <p className=" text-gray-500 truncate dark:text-gray-400"> {user.role}</p>
                    </div>

                    <div className="flex gap-4">
                      <p className="text-gray-500 truncate dark:text-gray-400 min-w-[100px]"> Role: </p>
                      <p className=" text-gray-500 truncate dark:text-gray-400"> {user.role}</p>
                    </div>

                    <div className="flex gap-4">
                      <p className="text-gray-500 truncate dark:text-gray-400 min-w-[100px]"> Date Of Birth: </p>
                      <p className=" text-gray-500 truncate dark:text-gray-400"> {user.dateOfBirth}</p>
                    </div>

                    <div className="flex gap-4">
                      <p className="text-gray-500 truncate dark:text-gray-400 min-w-[100px]">Created At: </p>
                      <p className=" text-gray-500 truncate dark:text-gray-400">
                        {' '}
                        {moment(user.createdAt).format(format())}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <p className="text-gray-500 truncate dark:text-gray-400 min-w-[100px]">Updated At: </p>
                      <p className=" text-gray-500 truncate dark:text-gray-400">
                        {moment(user.updatedAt).format(format())}
                      </p>
                    </div>

                    <div className="flex mt-4 space-x-3 lg:mt-6 justify-between">
                      <Link href={`/admin/${user._id}`}>
                        <button
                          type="button"
                          className="inline-flex items-center py-2 px-4 text-sm font-bold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Edit <EditIcon className=" ml-4" />
                        </button>
                      </Link>

                      <button
                        type="button"
                        className="inline-flex items-center py-2 px-4 text-sm font-bold text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                          handleOpen(user._id);
                        }}
                      >
                        Delete <DeleteIcon style={{ fontSize: '19px', marginLeft: '1rem' }} />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReducerType) => {
  return {
    listState: state.users
  };
};

const mapDispatchToProps = {
  getUsers,
  restDeleteUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserSUIPage);
