import {
  HiArchiveBox,
  HiCheckCircle,
  HiClock,
  HiDocumentText,
  HiEnvelope,
  HiExclamationTriangle,
  HiFolder,
  HiInbox,
  HiNewspaper,
  HiQueueList,
  HiTag,
  HiTicket,
  HiUserPlus,
  HiUsers,
} from "react-icons/hi2";
import { RiSettingsFill } from "react-icons/ri";

import type { StructureResolver } from "sanity/structure";
import { apiVersion } from "./env";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Blog")
        .icon(HiNewspaper)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post")
                .title("All Posts")
                .icon(HiDocumentText),
              S.divider(),
              S.listItem()
                .title("Featured Posts")
                .icon(HiNewspaper)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title("Featured Posts")
                    .schemaType("post")
                    .filter('_type == "post" && featured == true'),
                ),
              S.divider(),
              S.listItem()
                .title("Posts by Category")
                .icon(HiFolder)
                .child(
                  S.documentTypeList("category")
                    .title("Posts by Category")
                    .child((categoryId) =>
                      S.documentList()
                        .apiVersion(apiVersion)
                        .title("Posts")
                        .schemaType("post")
                        .filter(
                          '_type == "post" && $categoryId in categories[]._ref',
                        )
                        .params({ categoryId }),
                    ),
                ),
              S.listItem()
                .title("Posts by Series")
                .icon(HiQueueList)
                .child(
                  S.documentTypeList("series")
                    .title("Posts by Series")
                    .child((seriesId) =>
                      S.documentList()
                        .apiVersion(apiVersion)
                        .title("Posts")
                        .schemaType("post")
                        .filter('_type == "post" && series._ref == $seriesId')
                        .params({ seriesId })
                        .defaultOrdering([
                          { field: "publishedAt", direction: "asc" },
                        ]),
                    ),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Support Tickets")
        .icon(HiTicket)
        .child(
          S.list()
            .title("Support Tickets")
            .items([
              S.documentTypeListItem("ticket")
                .title("All Tickets")
                .icon(HiTicket),
              S.divider(),
              S.listItem()
                .title("Open")
                .icon(HiInbox)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title("Open Tickets")
                    .schemaType("ticket")
                    .filter('_type == "ticket" && status == "open"'),
                ),
              S.listItem()
                .title("In Progress")
                .icon(HiClock)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title("Tickets In Progress")
                    .schemaType("ticket")
                    .filter('_type == "ticket" && status == "inProgress"'),
                ),
              S.listItem()
                .title("Resolved")
                .icon(HiCheckCircle)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title("Resolved Tickets")
                    .schemaType("ticket")
                    .filter('_type == "ticket" && status == "resolved"'),
                ),
              S.listItem()
                .title("Closed")
                .icon(HiArchiveBox)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title("Closed Tickets")
                    .schemaType("ticket")
                    .filter('_type == "ticket" && status == "closed"'),
                ),
              S.divider(),
              S.listItem()
                .title("Unassigned")
                .icon(HiUserPlus)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title("Unassigned Tickets")
                    .schemaType("ticket")
                    .filter(
                      '_type == "ticket" && !defined(assignedTo.clerkId)',
                    ),
                ),
              S.listItem()
                .title("Urgent")
                .icon(HiExclamationTriangle)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title("Urgent Tickets")
                    .schemaType("ticket")
                    .filter(
                      '_type == "ticket" && priority == "urgent" && status != "closed"',
                    ),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Newsletter")
        .icon(HiEnvelope)
        .child(
          S.list()
            .title("Newsletter")
            .items([
              S.documentTypeListItem("subscriber")
                .title("All Subscribers")
                .icon(HiEnvelope),
              S.divider(),
              S.listItem()
                .title("Pending")
                .icon(HiClock)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title("Pending Subscribers")
                    .schemaType("subscriber")
                    .filter('_type == "subscriber" && status == "pending"'),
                ),
              S.listItem()
                .title("Confirmed")
                .icon(HiCheckCircle)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title("Confirmed Subscribers")
                    .schemaType("subscriber")
                    .filter('_type == "subscriber" && status == "confirmed"'),
                ),
              S.listItem()
                .title("Unsubscribed")
                .icon(HiInbox)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title("Unsubscribed")
                    .schemaType("subscriber")
                    .filter(
                      '_type == "subscriber" && status == "unsubscribed"',
                    ),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Taxonomy")
        .icon(HiFolder)
        .child(
          S.list()
            .title("Taxonomy")
            .items([
              S.documentTypeListItem("category")
                .title("Categories")
                .icon(HiFolder),
              S.documentTypeListItem("tag").title("Tags").icon(HiTag),
              S.documentTypeListItem("series")
                .title("Series")
                .icon(HiQueueList),
            ]),
        ),

      S.listItem()
        .title("People")
        .icon(HiUsers)
        .child(
          S.list()
            .title("People")
            .items([
              S.documentTypeListItem("author").title("Authors").icon(HiUsers),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Settings")
        .icon(RiSettingsFill)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
    ]);
