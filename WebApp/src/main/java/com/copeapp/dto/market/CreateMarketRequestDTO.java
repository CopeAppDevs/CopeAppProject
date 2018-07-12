package com.copeapp.dto.market;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.NonNull;

@Getter
public class CreateMarketRequestDTO {

	@NonNull private String name = null;
	private String description = null;
	@NonNull private Date openDate = null;
	@NonNull private Date expireDate = null;
	@NonNull private Date visibleDate = null;
	@NonNull private Date hiddenDate = null;
	@NonNull private Date creationDate = null;
	@NonNull private Integer creatorId = null;
	@NonNull private List<Integer> marketElementsIds = null;
}
