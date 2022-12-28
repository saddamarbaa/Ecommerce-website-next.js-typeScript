import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { ModalComponent as Modal, PaginationComponent as Pagination } from '@/components';
import { useDebounce } from '@/components/custom-hooks';
import { deleteUser, getUsers, ReducerType, restDeleteUser } from '@/global-states';
import {
  _authPrototypeReducerState as AuthReducerState,
  _usersPrototypeReducerState as ReducerState,
  UserType,
} from '@/types';
import { format } from '@/utils';

const { publicRuntimeConfig } = getConfig();

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getUsers: (filteredUrl: string) => void;
  restDeleteUser: () => void;
  deleteUser: (userId: string) => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
  authState: AuthReducerState;
}

type PropsType = MapDispatchProps & MapStateProps;

export function AdminUsersUIPage({
  getUsers,
  restDeleteUser,
  deleteUser,
  listState,
  authState,
}: PropsType) {
  const {
    users,
    // list,
    totalDocs,
    lastPage,
    listIsLoading,
    // listIsSuccess,
    listIsError,
    listMessage,
    deleteUserIsPending,
    deleteUserIsSuccess,
    deleteUserIsError,
    deleteUserMessage,
    updateUserIsSuccess,
  } = listState;

  const { updateProfileIsSuccess } = authState;

  const router = useRouter();
  const [addNewUser, setAddNewUser] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>();
  const [limit, setLimit] = useState<number | string>(10);
  const [page, setPage] = useState<number>(1);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<undefined | string>('createdAt');
  const [filterBy, setFilterBy] = useState<undefined | string>('all');
  const [sort, setSort] = useState<undefined | string>('desc');
  const [search, setSearch] = useState<string | ''>('');

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 250ms
  // As a result the API call should only fire once user stops typing
  const debouncedSearchTerm = useDebounce(search, 250);

  useEffect(() => {
    let filteredUrl = `/admin/users?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${sort}&filterBy=role&role=${filterBy}`;

    if (debouncedSearchTerm) {
      filteredUrl = `/admin/users?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${sort}&filterBy=role&role=${filterBy}&search=${debouncedSearchTerm}`;
    }
    getUsers(filteredUrl);
  }, [
    page,
    limit,
    sortBy,
    filterBy,
    sort,
    debouncedSearchTerm,
    deleteUserIsSuccess,
    updateProfileIsSuccess,
    updateUserIsSuccess,
  ]);

  useEffect(() => {
    if (deleteUserIsSuccess || deleteUserIsError) {
      setId(() => undefined);
      setShowAlert(() => true);
      setOpen(() => false);

      const timer = setTimeout(() => {
        setShowAlert(() => false);
        restDeleteUser();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [deleteUserIsSuccess, deleteUserIsError]);

  useEffect(() => {
    const redirectToSignUp = () => {
      if (addNewUser) {
        router.push('/admin/users/add-user');
      }
    };
    redirectToSignUp();
  }, [addNewUser]);

  if (addNewUser) {
    router.push('/admin/users/add-user');
  }

  const handleChange = (_event: any, value: number) => {
    setPage(value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    if (id) {
      deleteUser(id);
    }
  };

  return (
    <div>
      <div className="mx-auto mt-11 max-w-[1250px] p-5 text-[18px] ">
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

          <Modal
            handleClose={handleClose}
            open={open}
            handleSubmit={handleDelete}
            handlePending={deleteUserIsPending}
            message="user"
          />

          <div className="mb-4">
            <div className="flex-wrap items-center  justify-between gap-6 md:flex">
              <button
                type="button"
                onClick={() => setAddNewUser(true)}
                className="mb-4 block w-[85%]  items-center overflow-hidden rounded bg-blue-500  py-2 px-4 font-bold text-white hover:bg-blue-400 md:mb-0 md:max-w-[200px] "
              >
                Add New User
              </button>
              {lastPage > 0 && (
                <div className="mb-4 md:mb-0">
                  <Pagination handleChange={handleChange} page={page} totalPages={lastPage} />
                </div>
              )}

              <div className="flex  max-w-[85%] sm:max-w-full">
                <input
                  type="search"
                  className="form-control relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Search Users"
                  aria-label="Search Users"
                  aria-describedby="button-addon2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn  flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg "
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
            </div>
          </div>

          <div className="mb-4 flex-wrap items-center justify-between gap-6 md:flex">
            <div>
              <select
                className="focus:-blue-100 mb-4    w-full max-w-[85%]  rounded-md   border-transparent bg-blue-500 px-4 py-3 font-semibold hover:bg-blue-400
                 focus:border-gray-500  focus:bg-transparent focus:ring-0 sm:max-w-full"
                placeholder="Select a brand"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option defaultValue="all" value="all">
                  Filter By Role
                </option>
                <option defaultValue={filterBy} value="user">
                  Filter By User
                </option>
                <option value="guide">Filter By Guide</option>
                <option value="admin">Filter By Admin</option>
                <option value="manger">Filter By Manger</option>
                <option value="moderator">Filter By Moderator</option>
                <option value="supervisor">Filter By Supervisor</option>
                <option value="client">Filter By Client</option>
                <option value="all">Mix all roles</option>
              </select>
            </div>
            <div>
              <select
                className="focus:-blue-100 mb-4    w-full max-w-[85%]  rounded-md   border-transparent bg-blue-500 px-4 py-3 font-semibold hover:bg-blue-400
                 focus:border-gray-500  focus:bg-transparent focus:ring-0 sm:max-w-full"
                placeholder="Select a brand"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option defaultValue="createdAt" value="createdAt">
                  Sort By default
                </option>
                <option value="name"> Sort By Name</option>
                <option value="surname"> Sort By Surname</option>
                <option value="email"> Sort By Email</option>
                <option value="role"> Sort By Role</option>
              </select>
            </div>
            <div>
              <select
                className="focus:-blue-100 mb-4    w-full max-w-[85%]  rounded-md   border-transparent bg-blue-500 px-4 py-3 font-semibold hover:bg-blue-400
                focus:border-gray-500  focus:bg-transparent  focus:ring-0 sm:max-w-full
              "
                placeholder="Select a brand"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option defaultValue="asc" value="asc">
                  Sort by ascending
                </option>
                <option value="desc">Sort by descending </option>
              </select>
            </div>

            <div className="mb-4 flex max-w-[85%]  gap-4 ">
              <button
                type="button"
                className="mb-4 block w-[85%]  items-center overflow-hidden rounded bg-blue-500  py-2 px-4 font-bold text-white hover:bg-blue-400 md:mb-0 md:max-w-[200px]"
              >
                limit
              </button>
              <select
                className="focus:-blue-100 mb-4  block   w-[85%] items-center rounded-md border-transparent bg-gray-500 py-2 px-4 font-bold   hover:bg-blue-100 focus:border-gray-500 focus:bg-transparent focus:ring-0 md:mb-0 md:max-w-[200px] "
                placeholder="Select a brand"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              >
                {totalDocs &&
                  Array.from(Array(totalDocs > 100 ? 100 : totalDocs).keys()).map((_day, index) => (
                    <option key={uuidv4()} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mt-[4rem] flex flex-wrap justify-between gap-[4rem]">
            {users &&
              users.map((user: UserType) => (
                <div
                  key={uuidv4()}
                  className="easy-in-out container grid  max-w-lg transform cursor-pointer gap-y-2  overflow-hidden rounded-md
               border border-gray-200  bg-white shadow-lg transition duration-200 hover:scale-105
               md:min-w-[450px]"
                >
                  <div className="h-2/4 overflow-hidden sm:h-64">
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img
                      src="/avatar/avatrsm.avif"
                      alt="Photo by aldi sigun on Unsplash"
                      className="w-full rounded-t"
                    />
                  </div>
                  <div className="-mt-12 flex justify-start px-5 ">
                    <span className="relative block h-32 w-32">
                      <Image
                        src={`${publicRuntimeConfig.CONSOLE_BACKEND_IMG_ENDPOIN}${user.profileImage}`}
                        className="mx-auto rounded-full bg-white object-cover p-1"
                        alt="Profile Img"
                        width={96}
                        height={96}
                      />
                    </span>
                  </div>
                  <div>
                    <div className="mb-8 -mt-4 px-7">
                      <h2 className="text-3xl font-bold capitalize  text-green-800">
                        {user.name} {user.surname}{' '}
                      </h2>
                      <div className="mt-2 flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500"> Name: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">{user.name}</p>
                      </div>

                      <div className="mt-2 flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500">Surname: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">{user.surname}</p>
                      </div>

                      <div className="mt-2 flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500">Email: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">{user.email}</p>
                      </div>
                      <div className="mt-2 flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500">Gender: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">{user.gender}</p>
                      </div>

                      <div className="mt-2 flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500">Nationality: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">
                          {user.nationality || '-'}
                        </p>
                      </div>

                      <div className="mt-4 flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500 "> Address: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">
                          {' '}
                          {user.address || '-'}
                        </p>
                      </div>

                      <div className="mt-4 flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500"> MobileNumber: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">
                          {user.mobileNumber || '-'}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500"> Role: </p>
                        <p className=" truncate text-gray-500 "> {user.role}</p>
                      </div>

                      <div className="flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500"> Status: </p>
                        <p className=" text-gray-500  hover:text-[#c45500]">{user.status}</p>
                      </div>

                      <div className="flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500"> Verified: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">
                          {' '}
                          {user.isVerified ? 'Verified' : 'not Verified'}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500"> Accept Terms: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">
                          {' '}
                          {user.acceptTerms ? 'Accepted' : 'not Accepted'}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500">Job Title</p>
                        <p className="text-gray-500 hover:text-[#c45500]">{user.jobTitle || '-'}</p>
                      </div>

                      <div className="flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500">Favorite Animal</p>
                        <p className="text-gray-500 hover:text-[#c45500]">
                          {user.favoriteAnimal || '-'}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500"> Date Of Birth: </p>
                        <p className="0 text-gray-500 hover:text-[#c45500]"> {user.dateOfBirth}</p>
                      </div>

                      <div className="flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500">Created At: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">
                          {' '}
                          {moment(user.createdAt).format(format())}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <p className="min-w-[100px] truncate  text-gray-500">Updated At: </p>
                        <p className="text-gray-500  hover:text-[#c45500]">
                          {moment(user.updatedAt).format(format())}
                        </p>
                      </div>

                      <div className=" mt-4 flex gap-4" style={{ minHeight: '50px' }}>
                        <p className="min-w-[100px] truncate  text-gray-500"> Bio </p>
                        <p className="text-gray-500  hover:text-[#c45500]">{user.bio || '-'}</p>
                      </div>
                      <div className="mt-4 flex justify-between space-x-3 lg:mt-6">
                        <Link href={`/admin/users/${user._id}`}>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-bold text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Edit <EditIcon className=" ml-4" />
                          </button>
                        </Link>

                        <button
                          type="button"
                          className="inline-flex items-center rounded-lg bg-red-700 py-2 px-4 text-center text-sm font-bold text-white hover:bg-red-800 focus:ring-4"
                          onClick={() => {
                            setId(() => user._id);
                            handleOpen();
                          }}
                        >
                          Delete <DeleteIcon style={{ fontSize: '19px', marginLeft: '1rem' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div>
            {!users.length && (
              <div className="easy-in-out  container m-12  w-full transform rounded bg-white font-bold  shadow-lg  duration-200">
                {listIsLoading && (
                  <div className=" flex items-center justify-center ">
                    <CircularProgress color="secondary" />
                  </div>
                )}

                {!listIsError && !listIsLoading && (
                  <p className="bg-white p-12 text-center text-2xl font-semibold text-[#f08804]">
                    No user found
                  </p>
                )}

                {listIsError && (
                  <Alert variant="filled" severity="error">
                    {listMessage}
                  </Alert>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  listState: state.users || [],
  authState: state.auth,
});

const mapDispatchToProps = {
  getUsers,
  restDeleteUser,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsersUIPage);
