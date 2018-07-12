package com.copeapp.utilities;

import java.util.ArrayList;
import java.util.List;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.dozer.util.DozerConstants;

public class DozerMapper {

	private static Mapper instance;

	private DozerMapper() {}

	public static synchronized Mapper getMapper() {
		if (instance != null) {
			return instance;
		} else {
			return createMapper();
		}
	}
	
	public static synchronized Mapper createMapper(List<String> additionalMappingFiles) {
		if (instance == null) {
			List<String> mappingFiles = new ArrayList<String>();
			mappingFiles.add(DozerConstants.DEFAULT_MAPPING_FILE);
			if (additionalMappingFiles != null) {
				mappingFiles.addAll(additionalMappingFiles);
			}
			instance = new DozerBeanMapper(mappingFiles);
		}
		return instance;
	}

	public static synchronized Mapper createMapper() {
		if (instance == null) {
			List<String> mappingFiles = new ArrayList<String>();
			mappingFiles.add(DozerConstants.DEFAULT_MAPPING_FILE);
			instance = new DozerBeanMapper(mappingFiles);
		}
		return instance;
	}

	public static synchronized void destroyInstance() {
		instance = null;
	}
}
