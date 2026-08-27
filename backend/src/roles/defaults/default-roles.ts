export const DEFAULT_ROLES = [
  {
    name: 'OWNER',
    displayName: 'Owner',
    description: 'Organization owner',
    permissions: [
      // Organization & User Management
      'manage_organization',
      'transfer_ownership',
      'deactivate_organization',
      'manage_roles',
      'assign_roles',
      'manage_users',
      'view_users',

      // Project Management
      'view_all_projects',
      'create_project',
      'edit_project',
      'archive_project',
      'delete_project',
      'manage_project_members',
      'manage_project_settings',

      // Task Management
      'view_all_tasks',
      'create_task',
      'assign_task',
      'update_task_details',
      'update_task_status',
      'update_task_priority',
      'delete_task',
      'manage_labels',

      // Collaboration & Communication
      'add_comments',
      'update_comments',
      'delete_comments',
      'mention_users',
      'upload_files',
      'download_files',
      'delete_files',

      // Data & Analytics
      'view_analytics',
      'view_audit_logs',
      'view_activity_feed',

      // Notifications & Invitations
      'send_invitations',
      'manage_notification_preferences',

      // Search & Administration
      'perform_global_search',
      'manage_system_settings',
    ],
  },

  {
    name: 'ADMIN',
    displayName: 'Admin',
    description: 'Organization administrator',
    permissions: [
      // Organization & User Management
      'manage_organization',
      'manage_roles',
      'assign_roles',
      'manage_users',
      'view_users',

      // Project Management
      'view_all_projects',
      'create_project',
      'edit_project',
      'archive_project',
      'delete_project',
      'manage_project_members',
      'manage_project_settings',

      // Task Management
      'view_all_tasks',
      'create_task',
      'assign_task',
      'update_task_details',
      'update_task_status',
      'update_task_priority',
      'delete_task',
      'manage_labels',

      // Collaboration & Communication
      'add_comments',
      'update_comments',
      'delete_comments',
      'mention_users',
      'upload_files',
      'download_files',
      'delete_files',

      // Data & Analytics
      'view_analytics',
      'view_audit_logs',
      'view_activity_feed',

      // Notifications & Invitations
      'send_invitations',
      'manage_notification_preferences',

      // Search & Administration
      'perform_global_search',
    ],
  },

  {
    name: 'PROJECT_MANAGER',
    displayName: 'Project Manager',
    description: 'Manages organization projects and tasks',
    permissions: [
      // Users
      'view_users',

      // Projects
      'view_all_projects',
      'create_project',
      'edit_project',
      'archive_project',
      'manage_project_members',
      'manage_project_settings',

      // Tasks
      'view_all_tasks',
      'create_task',
      'assign_task',
      'update_task_details',
      'update_task_status',
      'update_task_priority',
      'delete_task',
      'manage_labels',

      // Collaboration
      'add_comments',
      'update_comments',
      'delete_comments',
      'mention_users',
      'upload_files',
      'download_files',
      'delete_files',

      // Analytics
      'view_analytics',
      'view_activity_feed',

      // Search
      'perform_global_search',

      // Notifications
      'manage_notification_preferences',
    ],
  },

  {
    name: 'MEMBER',
    displayName: 'Member',
    description: 'Regular organization member',
    permissions: [
      // Users
      'view_users',

      // Projects
      'view_all_projects',

      // Tasks
      'view_all_tasks',
      'create_task',
      'update_task_details',
      'update_task_status',
      'update_task_priority',

      // Collaboration
      'add_comments',
      'update_comments',
      'mention_users',
      'upload_files',
      'download_files',

      // Activity
      'view_activity_feed',

      // Search
      'perform_global_search',

      // Notifications
      'manage_notification_preferences',
    ],
  },

  {
    name: 'VIEWER',
    displayName: 'Viewer',
    description: 'Read-only organization member',
    permissions: [
      // Users
      'view_users',

      // Projects
      'view_all_projects',

      // Tasks
      'view_all_tasks',

      // Collaboration
      'download_files',

      // Analytics
      'view_analytics',
      'view_activity_feed',

      // Search
      'perform_global_search',

      // Notifications
      'manage_notification_preferences',
    ],
  },
] as const;