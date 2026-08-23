'use client';

import SearchInput from '@/shared/components/SearchInput';
import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  ChevronDown,
  Folder,
  ChevronRight,
  LayoutGrid,
  List,
  Image as GalleryIcon,
  GripVertical,
  FileText,
  Star,
  MoreVertical,
  ChevronLeft,
  HardDrive,
} from 'lucide-react';

type FileEntry = {
  name: string;
  size: string;
  date: string;
  stars?: number;
  downloads: number;
  iconBg: string;
  iconLabel: string;
};

type FolderEntry = {
  name: string;
  count: number;
  uploaded: string;
  by: string;
  files: FileEntry[];
};

const FOLDERS: FolderEntry[] = [
  {
    name: 'Design Assets',
    count: 4,
    uploaded: '2h ago',
    by: 'Alex Turner',
    files: [
      { name: 'mockup_v1.fig', size: '2.4 MB', date: 'Dec 12, 2026', stars: 2, downloads: 5, iconBg: '#5b4fc4', iconLabel: 'F' },
      { name: 'mockup_v2.fig', size: '3.1 MB', date: 'Dec 12, 2026', stars: 1, downloads: 2, iconBg: '#5b4fc4', iconLabel: 'F' },
      { name: 'style_guide.fig', size: '1.8 MB', date: 'Dec 11, 2026', stars: 3, downloads: 3, iconBg: '#5b4fc4', iconLabel: 'F' },
      { name: 'wireframes.pdf', size: '4.7 MB', date: 'Dec 10, 2026', downloads: 1, iconBg: '#b3382c', iconLabel: 'PDF' },
    ],
  },
  {
    name: 'Documentation',
    count: 2,
    uploaded: '1d ago',
    by: 'Wile Smith',
    files: [
      { name: 'requirements.pdf', size: '1.2 MB', date: 'Dec 11, 2026', stars: 4, downloads: 7, iconBg: '#b3382c', iconLabel: 'PDF' },
      { name: 'api_specs.md', size: '850 KB', date: 'Dec 11, 2026', stars: 2, downloads: 1, iconBg: 'var(--steel)', iconLabel: 'MD' },
    ],
  },
];

function FileTypeIcon({ label, bg }: { label: string; bg: string }) {
  return (
    <span className="file-icon-sm" style={{ background: bg, fontSize: 9, fontWeight: 700 }}>
      {label === 'F' ? <FileText size={13} /> : label}
    </span>
  );
}

export default function FilesPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="files-stat-row">
        <div className="files-stat-card">
          <span className="files-stat-icon" style={{ background: 'var(--ember-tint)', color: 'var(--ember)' }}>
            <Folder size={22} />
          </span>
          <div>
            <div className="files-stat-value">23</div>
            <div className="files-stat-label">Total Files</div>
            <div className="files-stat-sub">Across all folders</div>
          </div>
        </div>

        <div className="files-stat-card">
          <span className="files-stat-icon" style={{ background: 'var(--steel-tint)', color: 'var(--steel)' }}>
            <HardDrive size={20} />
          </span>
          <div>
            <div className="files-stat-value">
              156 <span className="files-stat-unit">MB</span>
            </div>
            <div className="files-stat-label">Used Space</div>
            <div className="files-stat-sub">of 350 MB total</div>
          </div>
        </div>

        <div className="files-stat-card">
          <span
            className="files-stat-icon"
            style={{
              background: 'var(--surface-3)',
              color: 'var(--gold)',
              borderRadius: '50%',
              boxShadow: 'inset 0 0 0 3px var(--gold)',
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700 }}>45%</span>
          </span>
          <div>
            <div className="files-stat-value">45%</div>
            <div className="files-stat-label">of 350 MB</div>
            <div className="files-stat-sub">Storage Used</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="files-toolbar-row">
          <SearchInput
            placeholder="Search files..."
            iconSize={16}
          />
          <button className="filter-select" type="button">
            <Filter size={14} />
            Filter
            <ChevronDown size={13} />
          </button>
          <button className="filter-select" type="button">
            <ArrowUpDown size={14} />
            Sort: Newest
            <ChevronDown size={13} />
          </button>
          <div className="split-btn">
            <button className="btn-primary" type="button">
              <Plus size={14} />
              Upload Files
            </button>
            <button className="split-btn-caret" type="button" aria-label="Upload options">
              <ChevronDown size={13} />
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="files-breadcrumb-row">
          <div className="files-breadcrumb">
            <span className="files-breadcrumb-crumb">
              <Folder size={14} color="var(--gold)" />
              Project Files
            </span>
            <ChevronRight size={13} className="sep" />
            <span className="files-breadcrumb-crumb">Design Assets</span>
            <ChevronRight size={13} className="sep" />
            <span className="files-breadcrumb-crumb current">Figma</span>
          </div>

          <div className="files-view-toggle">
            <button className="view-toggle-btn" type="button">
              <LayoutGrid size={14} />
              Grid View
            </button>
            <button className="view-toggle-btn active" type="button">
              <List size={14} />
              List View
            </button>
            <button className="view-toggle-btn" type="button">
              <GalleryIcon size={14} />
              Gallery View
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="file-tree">
          {FOLDERS.map((folder) => (
            <div key={folder.name}>
              <div className="folder-row">
                <GripVertical size={14} className="drag-handle" />
                <span className="folder-icon">
                  <Folder size={16} fill="var(--gold)" />
                </span>
                <span className="folder-name">{folder.name}</span>
                <span className="folder-count-badge">{folder.count}</span>
                <span className="folder-meta">
                  <span>
                    <strong>Uploaded: </strong>
                    {folder.uploaded}
                  </span>
                  <span>
                    <strong>By: </strong>
                    {folder.by}
                  </span>
                  <button className="kebab-btn" type="button" aria-label="Folder actions">
                    <MoreVertical size={15} />
                  </button>
                </span>
              </div>

              {folder.files.map((file) => (
                <div className="file-tree-row" key={file.name}>
                  <GripVertical size={13} className="drag-handle" />
                  <FileTypeIcon label={file.iconLabel} bg={file.iconBg} />
                  <span className="file-tree-name">{file.name}</span>
                  <span className="file-tree-size">{file.size}</span>
                  <span className="file-tree-date">{file.date}</span>
                  <span className="file-tree-stars">
                    {file.stars ? (
                      <>
                        <Star size={12} fill="var(--gold)" color="var(--gold)" />
                        {file.stars}
                      </>
                    ) : null}
                  </span>
                  <span className="file-tree-downloads">
                    {file.downloads} download{file.downloads === 1 ? '' : 's'}
                  </span>
                  <button className="kebab-btn" type="button" aria-label="File actions">
                    <MoreVertical size={15} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="files-footer-row">
          <span>Showing 23 files · Last updated 2h ago</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span>Page 1 of 3</span>
            <div className="pagination">
              <button className="page-btn" type="button" aria-label="Previous page">
                <ChevronLeft size={14} />
              </button>
              <button className="page-btn active" type="button">
                1
              </button>
              <button className="page-btn" type="button">
                2
              </button>
              <button className="page-btn" type="button">
                3
              </button>
              <button className="page-btn" type="button" aria-label="Next page">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
