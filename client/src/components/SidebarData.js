import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { MdFeedback, MdAdminPanelSettings } from 'react-icons/md'

export const SidebarData = [
  {
    title: 'Home',
    path: '/admin/home',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'Manage Admins',
    path: '/admin/administrator',
    icon: <MdAdminPanelSettings />
  },
  {
    title: 'Manage Accounts',
    path: '/admin/accounts',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Feedbacks',
    path: '/admin/feedback',
    icon: <MdFeedback />
  },
  {
    title: 'Reports' ,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginLeft: "auto", width:"20px" }} />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginLeft: "auto", width:"20px" }}  />,

    subNav: [
      {
        title: 'Reported Post',
        path: '/admin/reports',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Reports (Not Available)',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  }
];
